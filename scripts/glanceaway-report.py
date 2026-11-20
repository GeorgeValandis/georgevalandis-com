#!/usr/bin/env python3
"""Weekly GlanceAway web report: visitors (Cloudflare), Google rankings (Search Console),
store clicks per page (own click counter) and App Store downloads per source and campaign.

Usage: python3 scripts/glanceaway-report.py [--days 7] [--out FILE]
Secrets come only from the macOS keychain; nothing is written to the repo.
"""

import argparse
import csv
import datetime as dt
import functools
import json
import os
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request
from collections import Counter

FTP_HOST = "w01ee4c4.kasserver.com"
FTP_USER = "w01ee4c4"
COUNTS_PATH = "/georgevalandis.com/apps/glanceaway/download/.download-click-counts.json"

# Campaign token -> page the click came from.
PAGES = {
    "organic_direct": "Hauptseite",
    "seo_timer": "Ratgeber Timer",
    "seo_apps": "Ratgeber App-Vergleich",
    "seo_strain": "Ratgeber Augenbelastung",
    "landing_v2": "Vorschau v2",
}
IGNORED = {"test_probe"}

# URL path -> short page name for visitor and Google tables.
PATHS = {
    "/apps/glanceaway/": "Hauptseite",
    "/apps/glanceaway/20-20-20-rule-timer/": "Ratgeber Timer",
    "/apps/glanceaway/20-20-20-rule-app/": "Ratgeber App-Vergleich",
    "/apps/glanceaway/eye-strain-from-screens/": "Ratgeber Augenbelastung",
    "/apps/glanceaway/mac/": "Mac-Seite",
}
PATH_PREFIX = "/apps/glanceaway"

# Search Console: read-only service account, impersonated with the local gcloud login (no key file).
GSC_SERVICE_ACCOUNT = "glanceaway-report@glanceaway-revenuecat.iam.gserviceaccount.com"
GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"

# Cloudflare Web Analytics: ids are not secret, the API token lives in the keychain.
CLOUDFLARE_ACCOUNT_ID = "3d33a0f56d49031d16a8141df5e14c2c"
# App Store Connect: own read key (Sales role) stored as asc profile; ongoing analytics request.
ASC_PROFILE = "glanceaway-report"
ASC_REQUEST_ID = "7cae2271-ccfe-4ad0-8608-44c25babbe8e"
SOURCE_NAMES = {
    "App Store search": "App-Store-Suche",
    "App Store browse": "App Store stöbern",
    "Web referrer": "Websites",
    "App referrer": "Andere Apps",
    "Institutional purchase": "Firmenkauf",
    "Unavailable": "Unbekannt",
}
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def cloudflare_site_tag():
    """The public beacon token from .env.local doubles as the Web Analytics site tag."""
    try:
        with open(os.path.join(REPO, ".env.local")) as handle:
            for line in handle:
                if line.startswith("NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN="):
                    return line.split("=", 1)[1].strip().strip('"')
    except OSError:
        pass
    return ""


CLOUDFLARE_KEYCHAIN = ("glanceaway-report-cloudflare", "api-token")


def http_json(url, token, body=None):
    request = urllib.request.Request(
        url,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST" if body is not None else "GET",
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.load(response)


def page_label(path):
    path = urllib.parse.urlsplit(path).path or "/"
    if not path.endswith("/"):
        path += "/"
    return PATHS.get(path, path.removeprefix(PATH_PREFIX) or path)


def change(now, before):
    if not before:
        return "neu" if now else "–"
    delta = (now - before) / before * 100
    return f"{delta:+.0f} %"


def keychain(service, account):
    result = subprocess.run(
        ["security", "find-generic-password", "-s", service, "-a", account, "-w"],
        capture_output=True,
        text=True,
    )
    return result.stdout.strip() if result.returncode == 0 else None


def fetch_click_counts():
    password = keychain("georgevalandis-ftp", FTP_USER)
    if not password:
        raise RuntimeError("FTP-Passwort fehlt im Schlüsselbund (georgevalandis-ftp)")
    with tempfile.TemporaryDirectory() as tmp:
        target = os.path.join(tmp, "counts.json")
        script = (
            "set ftp:ssl-force true; set ftp:ssl-protect-data true; set net:max-retries 2; "
            f"open --env-password -u {FTP_USER} ftp://{FTP_HOST}; get {COUNTS_PATH} -o {target}"
        )
        subprocess.run(
            ["lftp", "-c", script],
            check=True,
            capture_output=True,
            env={**os.environ, "LFTP_PASSWORD": password},
            timeout=120,
        )
        with open(target) as handle:
            return json.load(handle)


def page_name(campaign):
    if campaign in PAGES:
        return PAGES[campaign]
    if campaign.startswith("setup-"):
        return "Social: " + campaign.removeprefix("setup-")
    return campaign


def click_section(counts, start, end, prev_start):
    now, before = Counter(), Counter()
    positions = Counter()
    for key, value in counts.items():
        day, source, campaign = key.split("|", 2)
        if campaign in IGNORED:
            continue
        date = dt.date.fromisoformat(day)
        page = page_name(campaign)
        if start <= date <= end:
            now[page] += value
            position = source.split("-", 1)[1] if "-" in source else "–"
            positions[(page, position)] += value
        elif prev_start <= date < start:
            before[page] += value

    lines = ["## Klicks in den App Store", ""]
    if not now and not before:
        lines.append("Keine Klicks in beiden Zeiträumen.")
        return lines, 0
    lines += ["| Seite | Klicks | Zeitraum davor |", "|---|---:|---:|"]
    for page in sorted(set(now) | set(before), key=lambda p: (-now[p], p)):
        lines.append(f"| {page} | {now[page]} | {before[page]} |")
    lines.append(f"| **Gesamt** | **{sum(now.values())}** | {sum(before.values())} |")
    detail = [f"{page} ({position}): {n}" for (page, position), n in positions.most_common() if position != "–"]
    if detail:
        lines += ["", "Nach Knopf: " + " · ".join(detail)]
    return lines, sum(now.values())


def visitor_section(start, end, prev_start):
    """Page views and visits per page plus top referrers (Cloudflare Web Analytics, no cookies)."""
    token = keychain(*CLOUDFLARE_KEYCHAIN)
    site_tag = cloudflare_site_tag()
    if not (token and site_tag):
        raise RuntimeError("Cloudflare-Zugang fehlt (Token im Schlüsselbund oder Site-Tag)")
    query = """
    query ($account: string!, $filter: AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!) {
      viewer { accounts(filter: {accountTag: $account}) {
        pages: rumPageloadEventsAdaptiveGroups(limit: 200, filter: $filter, orderBy: [sum_visits_DESC]) {
          count sum { visits } dimensions { requestPath }
        }
        refs: rumPageloadEventsAdaptiveGroups(limit: 8, filter: $filter, orderBy: [sum_visits_DESC]) {
          sum { visits } dimensions { refererHost }
        }
      } }
    }"""

    def run(first, last):
        variables = {
            "account": CLOUDFLARE_ACCOUNT_ID,
            "filter": {"AND": [
                {"siteTag": site_tag},
                {"date_geq": first.isoformat()},
                {"date_leq": last.isoformat()},
                {"requestPath_like": PATH_PREFIX + "%"},
            ]},
        }
        data = http_json(
            "https://api.cloudflare.com/client/v4/graphql", token, {"query": query, "variables": variables}
        )
        if data.get("errors"):
            raise RuntimeError(data["errors"][0].get("message", "GraphQL-Fehler"))
        account = data["data"]["viewer"]["accounts"][0]
        visits = Counter()
        for row in account["pages"]:
            visits[page_label(row["dimensions"]["requestPath"])] += row["sum"]["visits"]
        refs = [(row["dimensions"]["refererHost"] or "direkt", row["sum"]["visits"]) for row in account["refs"]]
        return visits, refs

    now, refs = run(start, end)
    before, _ = run(prev_start, start - dt.timedelta(days=1))
    lines = ["## Besucher", "", "| Seite | Besuche | Zeitraum davor | Änderung |", "|---|---:|---:|---:|"]
    for page in sorted(set(now) | set(before), key=lambda p: (-now[p], p))[:12]:
        lines.append(f"| {page} | {now[page]} | {before[page]} | {change(now[page], before[page])} |")
    total, total_before = sum(now.values()), sum(before.values())
    lines.append(f"| **Gesamt** | **{total}** | {total_before} | {change(total, total_before)} |")
    if refs:
        lines += ["", "Herkunft: " + " · ".join(f"{host} {n}" for host, n in refs)]
    return lines


def gsc_token():
    result = subprocess.run(
        ["gcloud", "auth", "print-access-token",
         f"--impersonate-service-account={GSC_SERVICE_ACCOUNT}", f"--scopes={GSC_SCOPE}"],
        capture_output=True, text=True, timeout=60,
    )
    if result.returncode != 0 or not result.stdout.strip():
        raise RuntimeError("Google-Zugang fehlt (gcloud-Login oder Rechte am Dienstkonto)")
    return result.stdout.strip()


def google_section(days):
    """Search Console clicks, impressions and position per page and top queries."""
    token = gsc_token()
    sites = http_json("https://searchconsole.googleapis.com/webmasters/v3/sites", token).get("siteEntry", [])
    site = next((s["siteUrl"] for s in sites if "georgevalandis.com" in s["siteUrl"]), None)
    if not site:
        raise RuntimeError("Dienstkonto sieht die Property noch nicht (Nutzer in der Search Console fehlt)")
    endpoint = (
        "https://searchconsole.googleapis.com/webmasters/v3/sites/"
        + urllib.parse.quote(site, safe="")
        + "/searchAnalytics/query"
    )
    # Google data lags about three days.
    end = dt.date.today() - dt.timedelta(days=3)
    start = end - dt.timedelta(days=days - 1)
    prev_end = start - dt.timedelta(days=1)
    prev_start = prev_end - dt.timedelta(days=days - 1)
    page_filter = [{"filters": [{"dimension": "page", "operator": "contains", "expression": PATH_PREFIX}]}]

    def query(first, last, dimension, limit):
        body = {
            "startDate": first.isoformat(),
            "endDate": last.isoformat(),
            "dimensions": [dimension],
            "dimensionFilterGroups": page_filter,
            "rowLimit": limit,
        }
        return http_json(endpoint, token, body).get("rows", [])

    def by_page(rows):
        table = {}
        for row in rows:
            label = page_label(row["keys"][0])
            clicks, imps, pos = table.get(label, (0, 0, 0.0))
            # Impression-weighted position when several URLs map to one label.
            weighted = pos * imps + row["position"] * row["impressions"]
            imps += row["impressions"]
            table[label] = (clicks + row["clicks"], imps, weighted / imps if imps else 0)
        return table

    now = by_page(query(start, end, "page", 100))
    before = by_page(query(prev_start, prev_end, "page", 100))
    lines = [
        f"## Google ({start:%d.%m.}–{end:%d.%m.})",
        "",
        "| Seite | Klicks | Impressionen | Ø Platz | Platz davor |",
        "|---|---:|---:|---:|---:|",
    ]
    if not now:
        lines = lines[:2] + ["Noch keine Einblendungen bei Google."]
    for page in sorted(now, key=lambda p: -now[p][1]):
        clicks, imps, pos = now[page]
        old = f"{before[page][2]:.1f}" if page in before else "–"
        lines.append(f"| {page} | {clicks} | {imps} | {pos:.1f} | {old} |")
    queries = query(start, end, "query", 10)
    if queries:
        lines += ["", "| Suchbegriff | Klicks | Impressionen | Ø Platz |", "|---|---:|---:|---:|"]
        for row in queries:
            lines.append(f"| {row['keys'][0]} | {row['clicks']} | {row['impressions']} | {row['position']:.1f} |")
    return lines


def asc(*args, timeout=300):
    result = subprocess.run(
        ["asc", "--profile", ASC_PROFILE, *args], capture_output=True, text=True, timeout=timeout
    )
    if result.returncode != 0:
        raise RuntimeError(f"asc {args[1]}: {(result.stderr or result.stdout).strip()[:200]}")
    return result.stdout


@functools.cache
def asc_reports():
    """Report list with daily instances; slow (about a minute), so fetched once per run."""
    listing = asc("analytics", "view", "--request-id", ASC_REQUEST_ID, "--granularity", "DAILY", "--paginate")
    return json.loads(listing)["data"]


def asc_rows(report_name, first, last):
    """All rows of one daily analytics report whose Date lies in [first, last]."""
    report = next((r for r in asc_reports() if r["name"] == report_name), None)
    if not report:
        raise RuntimeError(f"Bericht „{report_name}“ fehlt")
    rows = []
    with tempfile.TemporaryDirectory() as tmp:
        for instance in report.get("instances", []):
            # Processing runs a day or two after the data date.
            processed = dt.date.fromisoformat(instance["processingDate"])
            if not first <= processed <= last + dt.timedelta(days=4):
                continue
            target = os.path.join(tmp, instance["id"] + ".csv.gz")
            asc("analytics", "download", "--request-id", ASC_REQUEST_ID,
                "--instance-id", instance["id"], "--decompress", "--output", target)
            with open(target.removesuffix(".gz"), newline="") as handle:
                for row in csv.DictReader(handle, delimiter="\t"):
                    if first <= dt.date.fromisoformat(row["Date"]) <= last:
                        rows.append(row)
    return rows


def downloads_section(start, end, prev_start):
    """New downloads per App Store source, plus downloads per campaign link (App Store Connect)."""
    new = {"First-time download", "Redownload"}
    standard = [r for r in asc_rows("App Downloads Standard", prev_start, end) if r["Download Type"] in new]
    now, before = Counter(), Counter()
    for row in standard:
        bucket = now if dt.date.fromisoformat(row["Date"]) >= start else before
        bucket[SOURCE_NAMES.get(row["Source Type"], row["Source Type"])] += int(row["Counts"])

    lines = [
        "## Downloads (alle Länder, iPhone und Mac)",
        "",
        "| Herkunft | Downloads | Zeitraum davor |",
        "|---|---:|---:|",
    ]
    for source in sorted(set(now) | set(before), key=lambda s: (-now[s], s)):
        lines.append(f"| {source} | {now[source]} | {before[source]} |")
    lines.append(f"| **Gesamt** | **{sum(now.values())}** | {sum(before.values())} |")

    campaigns = Counter()
    for row in asc_rows("App Downloads Detailed", start, end):
        if row["Download Type"] in new and row["Campaign"]:
            campaigns[page_name(row["Campaign"])] += int(row["Counts"])
    lines += ["", "Nach Kampagne (Store-Links mit ct): " + (
        " · ".join(f"{name} {n}" for name, n in campaigns.most_common())
        or "keine (Apple zeigt Kampagnen erst ab einigen Downloads)"
    )]
    lines.append("Apple liefert mit 1–2 Tagen Verzug; die letzten Tage können noch fehlen.")
    return lines


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--days", type=int, default=7)
    parser.add_argument("--out")
    args = parser.parse_args()

    end = dt.date.today() - dt.timedelta(days=1)
    start = end - dt.timedelta(days=args.days - 1)
    prev_start = start - dt.timedelta(days=args.days)

    report = [f"# GlanceAway Web-Bericht {start:%d.%m.}–{end:%d.%m.%Y}", ""]
    sections = [
        ("Besucher", lambda: visitor_section(start, end, prev_start)),
        ("Google", lambda: google_section(args.days)),
        ("Klicks in den App Store", lambda: click_section(fetch_click_counts(), start, end, prev_start)[0]),
        ("Downloads", lambda: downloads_section(start, end, prev_start)),
    ]
    for title, build in sections:
        try:
            report += build()
        except Exception as error:  # report the gap instead of failing the whole report
            report += [f"## {title}", "", f"⚠️ Nicht abrufbar: {error}"]
        report.append("")

    text = "\n".join(report).rstrip() + "\n"
    if args.out:
        with open(args.out, "w") as handle:
            handle.write(text)
    sys.stdout.write(text)


if __name__ == "__main__":
    main()
