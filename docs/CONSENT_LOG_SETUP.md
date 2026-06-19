# Consent Log Setup on ALL-INKL

This setup keeps consent logging on your own ALL-INKL hosting stack. No Supabase or third-party database is required.

## 1. Create a MySQL database in KAS

1. Open `KAS`.
2. Go to `Datenbanken`.
3. Create a new MySQL database.
4. Note these values:
   - `DB host`
   - `DB name`
   - `DB user`
   - `DB password`

## 2. Create the database table

1. Open `phpMyAdmin` from the same database area in KAS.
2. Select the new database.
3. Open the `SQL` tab.
4. Paste the SQL from [`docs/consent-log.sql`](/Users/georgiosavenidis/CascadeProjects/windsurf-project/homepage/docs/consent-log.sql).
5. Run it.

For an existing installation that was created before scoped landing page consent, run this once if the `scope` column is missing:

```sql
ALTER TABLE consent_log ADD COLUMN scope VARCHAR(128) NOT NULL DEFAULT 'site' AFTER policy_version;
ALTER TABLE consent_log ADD KEY idx_consent_log_scope (scope);
```

## 3. Create the server config file

Create this file on the server:

- Path: `consent/config.php`

Copy the structure from [`public/consent/config.sample.php`](/Users/georgiosavenidis/CascadeProjects/windsurf-project/homepage/public/consent/config.sample.php) and replace all placeholder values.

Example:

```php
<?php

return [
    'db_host' => 'mysql5.your-host.de',
    'db_port' => 3306,
    'db_name' => 'db1234567',
    'db_user' => 'dbu1234567',
    'db_pass' => 'your-strong-db-password',
    'hash_salt' => 'put-a-long-random-secret-here',
    'export_token' => 'put-a-second-long-random-secret-here',
];
```

Use a long random `hash_salt`. It is used to pseudonymize visitor IPs before storing them.
Use a separate long random `export_token` for the CSV export endpoint.

## 4. Deploy the consent logger files

These files must exist on the webspace:

- [`public/consent/log.php`](/Users/georgiosavenidis/CascadeProjects/windsurf-project/homepage/public/consent/log.php)
- [`public/consent/export.php`](/Users/georgiosavenidis/CascadeProjects/windsurf-project/homepage/public/consent/export.php)
- [`public/consent/delete.php`](/Users/georgiosavenidis/CascadeProjects/windsurf-project/homepage/public/consent/delete.php)
- `consent/config.php`

For a static export deployment, they should end up at:

- `/consent/log.php`
- `/consent/export.php`
- `/consent/delete.php`
- `/consent/config.php`

## 5. Verify the endpoint

Open:

- `https://your-domain/consent/log.php`

Expected result in the browser:

- `{"ok":false,"error":"method_not_allowed"}`

That confirms the PHP file is reachable.

## 6. Verify logging

1. Open the website in a private window.
2. Choose a consent option in the banner.
3. Go to `phpMyAdmin`.
4. Open the `consent_log` table.
5. Confirm a new row exists.

## 7. Export the log as CSV

Open:

- `https://your-domain/consent/export.php?token=YOUR_EXPORT_TOKEN`

Optional filters:

- `limit=500`
- `consent_id=CONSENT_ID_FROM_COOKIE_SETTINGS`
- `scope=site`
- `scope=app:glanceaway`
- `page_url=https://example.com/apps/app-slug/`
- `page_contains=/apps/app-slug/`
- `from=2026-03-01`
- `to=2026-03-31`

Example:

- `https://your-domain/consent/export.php?token=YOUR_EXPORT_TOKEN&limit=500&from=2026-03-01&to=2026-03-31`
- `https://your-domain/consent/export.php?token=YOUR_EXPORT_TOKEN&consent_id=CONSENT_ID_FROM_COOKIE_SETTINGS`
- `https://your-domain/consent/export.php?token=YOUR_EXPORT_TOKEN&scope=app:glanceaway`
- `https://your-domain/consent/export.php?token=YOUR_EXPORT_TOKEN&page_contains=/apps/glanceaway/`

Use `consent_id` when a customer requests access to their consent record. Use `scope`, `page_contains`, or `page_url` to review consent records for a specific landing page.

## 8. Delete a customer consent record

Ask the customer for the Consent ID shown in the Cookie Settings modal. Then send a POST request to the delete endpoint with the private export token:

```bash
curl -X POST "https://your-domain/consent/delete.php" \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_EXPORT_TOKEN","consentId":"CONSENT_ID_FROM_COOKIE_SETTINGS","scope":"app:glanceaway"}'
```

The `scope` field is optional, but recommended for app landing pages so deletion uses the same separated channel as storage and export.

Expected response:

```json
{"ok":true,"removed":1}
```

If `removed` is `0`, no stored consent record matched that Consent ID.

## Stored fields

Each decision stores:

- `consent_id`
- `consent_version`
- `policy_version`
- `scope`
- `method`
- `necessary`
- `analytics`
- `marketing`
- `decided_at`
- `page_url`
- `locale`
- `timezone`
- `ip_hash`
- `user_agent`

## Notes

- The frontend sends logs to `/consent/log.php`.
- IPs are not stored in plain text; only a salted hash is stored.
- Consent storage is scoped. The main website uses `site`; app landing pages use `app:{slug}`, for example `app:glanceaway`.
- The browser storage keys are scoped too, so a consent decision on one standalone landing page does not silently cover another app landing page on the same host.
- The Cookie Settings modal shows the customer's Consent ID for access and deletion requests.
- CSV export supports customer lookup by `consent_id` and landing page lookup by `scope`, `page_url`, or `page_contains`.
- If `config.php` is missing, logging fails safely and the banner still works.
