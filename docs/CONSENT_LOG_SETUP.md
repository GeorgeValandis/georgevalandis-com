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
- `consent/config.php`

For a static export deployment, they should end up at:

- `/consent/log.php`
- `/consent/export.php`
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
- `from=2026-03-01`
- `to=2026-03-31`

Example:

- `https://your-domain/consent/export.php?token=YOUR_EXPORT_TOKEN&limit=500&from=2026-03-01&to=2026-03-31`

## Stored fields

Each decision stores:

- `consent_id`
- `consent_version`
- `policy_version`
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
- If `config.php` is missing, logging fails safely and the banner still works.
