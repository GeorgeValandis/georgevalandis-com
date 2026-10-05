#!/usr/bin/env bash
# Deploy georgevalandis.com to ALL-INKL via FTPS (lftp), without KAS/WebFTP login.
#
#   npm run deploy            build HEAD, show which files would be uploaded (dry run)
#   npm run deploy -- --yes   build HEAD and upload the changed files
#   npm run deploy -- --check test the FTP connection only
#
# - Builds the committed HEAD in a temp copy, never in the repo's out/.
# - Only uploads (new or changed files). Never deletes anything on the server.
# - Password comes from the macOS keychain (service "georgevalandis-ftp"), set once by hand:
#     security add-generic-password -s georgevalandis-ftp -a w01ee4c4 -w
set -euo pipefail

FTP_HOST="${FTP_HOST:-w01ee4c4.kasserver.com}"
FTP_USER="${FTP_USER:-w01ee4c4}"
KEYCHAIN_SERVICE="georgevalandis-ftp"
REMOTE_ROOT="/georgevalandis.com"
STATE_DIR="$HOME/.local/state/georgevalandis-deploy"
MANIFEST="$STATE_DIR/manifest.sha256"

REPO="$(cd "$(dirname "$0")/.." && pwd)"
MODE="dry"
SERVER_FILES="skip"
for arg in "$@"; do
  case "$arg" in
    --yes) MODE="upload" ;;
    --check) MODE="check" ;;
    --include-server-files) SERVER_FILES="include" ;;
    *) echo "Unbekannte Option: $arg" >&2; exit 2 ;;
  esac
done
# PHP and .htaccess run on the server; they are only overwritten after an FTP comparison
# shows they differ AND --include-server-files is passed.
SERVER_RE='(\.php|\.htaccess)$'

command -v lftp >/dev/null || { echo "lftp fehlt: brew install lftp" >&2; exit 1; }

ftp_password() {
  security find-generic-password -s "$KEYCHAIN_SERVICE" -a "$FTP_USER" -w 2>/dev/null || {
    echo "Kein FTP-Passwort im Schlüsselbund. Einmal ausführen:" >&2
    echo "  security add-generic-password -s $KEYCHAIN_SERVICE -a $FTP_USER -w" >&2
    exit 1
  }
}

# Password goes via env (--env-password), so it never shows up in the process list.
run_lftp() {
  LFTP_PASSWORD="$(ftp_password)" lftp -c "
    set ftp:ssl-force true
    set ftp:ssl-protect-data true
    set ssl:verify-certificate true
    set net:max-retries 2
    set net:timeout 20
    open --env-password -u $FTP_USER ftp://$FTP_HOST
    $1"
}

if [[ "$MODE" == "check" ]]; then
  run_lftp "cls -1 $REMOTE_ROOT/ | head -n 20"
  echo "✅ Verbindung ok ($FTP_HOST, $REMOTE_ROOT)"
  exit 0
fi

# 1. Build HEAD in a temp copy
cd "$REPO"
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "⚠️  Uncommittete Änderungen werden NICHT deployt (nur der Commit HEAD)."
fi
HEAD_SHA="$(git rev-parse --short HEAD)"
BUILD_DIR="$(mktemp -d "${TMPDIR:-/tmp}/georgevalandis-deploy.XXXXXX")"
echo "→ Baue $HEAD_SHA in $BUILD_DIR"
git archive HEAD | tar -x -C "$BUILD_DIR"
cp -cR "$REPO/node_modules" "$BUILD_DIR/node_modules"
(cd "$BUILD_DIR" && env PATH="/usr/local/bin:$PATH" npm run build >"$BUILD_DIR/build.log" 2>&1) || {
  echo "❌ Build fehlgeschlagen, siehe $BUILD_DIR/build.log" >&2; exit 1; }
OUT="$BUILD_DIR/out"

# 2. Diff against the manifest of the last successful deploy
mkdir -p "$STATE_DIR"
NEW_MANIFEST="$BUILD_DIR/manifest.sha256"
(cd "$OUT" && find . -type f ! -name .DS_Store -print0 | sort -z | xargs -0 shasum -a 256) >"$NEW_MANIFEST"
CHANGED="$BUILD_DIR/changed.txt"
if [[ -f "$MANIFEST" ]]; then
  comm -13 <(sort "$MANIFEST") <(sort "$NEW_MANIFEST") | sed -E 's/^[0-9a-f]+  \.\///' >"$CHANGED"
else
  # First run: compare every built file with what https://georgevalandis.com serves today.
  echo "ℹ️  Erster Deploy: vergleiche den Build mit der Live-Seite …"
  sed -E 's/^[0-9a-f]+  \.\///' "$NEW_MANIFEST" | while IFS= read -r f; do printf '%s\0' "$f"; done |
    xargs -0 -P 12 -I{} sh -c '
      want=$(shasum -a 256 "$1/$2" | cut -d" " -f1)
      have=$(curl -fsS --max-time 20 "https://georgevalandis.com/$2" 2>/dev/null | shasum -a 256 | cut -d" " -f1)
      [ "$want" = "$have" ] || echo "$2"' _ "$OUT" {} | sort >"$CHANGED"
fi
COUNT="$(wc -l <"$CHANGED" | tr -d ' ')"

if [[ "$COUNT" == "0" ]]; then
  echo "✅ Nichts zu tun, Server ist auf Stand $HEAD_SHA."
  exit 0
fi

echo "→ $COUNT Datei(en) neu oder geändert:"
sed 's/^/   /' "$CHANGED" | head -n 60
[[ "$COUNT" -gt 60 ]] && echo "   … und $((COUNT - 60)) weitere (komplett: $CHANGED)"

if [[ "$MODE" == "dry" ]]; then
  if grep -qE "$SERVER_RE" "$CHANGED"; then
    echo "ℹ️  PHP/.htaccess darunter werden beim echten Lauf erst per FTP verglichen und nur mit --include-server-files überschrieben."
  fi
  echo "Probelauf. Hochladen mit: npm run deploy -- --yes"
  exit 0
fi

# Server-side files: download the live versions and drop the identical ones from the list
if grep -qE "$SERVER_RE" "$CHANGED"; then
  REMOTE_COPY="$BUILD_DIR/remote"
  mkdir -p "$REMOTE_COPY"
  GETS="$BUILD_DIR/lftp-gets.txt"
  : >"$GETS"
  grep -E "$SERVER_RE" "$CHANGED" | while IFS= read -r f; do
    mkdir -p "$REMOTE_COPY/$(dirname "$f")"
    printf 'get "%s/%s" -o "%s/%s"\n' "$REMOTE_ROOT" "$f" "$REMOTE_COPY" "$f" >>"$GETS"
  done
  run_lftp "source $GETS" 2>/dev/null || true
  KEEP="$BUILD_DIR/changed.filtered"
  SKIPPED="$BUILD_DIR/skipped.txt"
  : >"$KEEP"
  while IFS= read -r f; do
    if [[ "$f" =~ $SERVER_RE ]]; then
      if [[ -f "$REMOTE_COPY/$f" ]] && cmp -s "$OUT/$f" "$REMOTE_COPY/$f"; then
        continue
      fi
      if [[ "$SERVER_FILES" != "include" ]]; then
        if [[ -f "$REMOTE_COPY/$f" ]]; then echo "⚠️  Übersprungen (auf dem Server anders): $f"
        else echo "⚠️  Übersprungen (fehlt auf dem Server): $f"; fi
        echo "$f" >>"$SKIPPED"
        continue
      fi
    fi
    echo "$f" >>"$KEEP"
  done <"$CHANGED"
  mv "$KEEP" "$CHANGED"
  COUNT="$(wc -l <"$CHANGED" | tr -d ' ')"
fi
[[ "$COUNT" == "0" ]] && { echo "✅ Nichts hochzuladen."; exit 0; }

# 3. Upload only the changed files (mkdir -p for new folders, put overwrites, nothing is deleted)
CMDS="$BUILD_DIR/lftp-cmds.txt"
: >"$CMDS"
while IFS= read -r f; do
  dir="$(dirname "$f")"
  [[ "$dir" != "." ]] && printf 'mkdir -p -f "%s/%s"\n' "$REMOTE_ROOT" "$dir" >>"$CMDS"
  printf 'put "%s/%s" -o "%s/%s"\n' "$OUT" "$f" "$REMOTE_ROOT" "$f" >>"$CMDS"
done <"$CHANGED"
run_lftp "set cmd:fail-exit true; source $CMDS"

# Remember what is live now; skipped server files stay "pending" for the next run
if [[ -s "${SKIPPED:-}" ]]; then
  grep -vF -f <(sed 's#^#  ./#' "$SKIPPED") "$NEW_MANIFEST" >"$MANIFEST"
else
  cp "$NEW_MANIFEST" "$MANIFEST"
fi
echo "$HEAD_SHA $(date -u +%FT%TZ)" >"$STATE_DIR/last-deploy"
echo "✅ $COUNT Datei(en) hochgeladen, Stand $HEAD_SHA."
