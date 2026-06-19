CREATE TABLE IF NOT EXISTS consent_log (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    consent_id VARCHAR(64) NOT NULL,
    consent_version SMALLINT UNSIGNED NOT NULL,
    policy_version SMALLINT UNSIGNED NOT NULL,
    scope VARCHAR(128) NOT NULL DEFAULT 'site',
    method VARCHAR(32) NOT NULL,
    necessary TINYINT(1) NOT NULL DEFAULT 1,
    analytics TINYINT(1) NOT NULL DEFAULT 0,
    marketing TINYINT(1) NOT NULL DEFAULT 0,
    decided_at DATETIME(6) NOT NULL,
    page_url VARCHAR(2048) DEFAULT NULL,
    locale VARCHAR(32) DEFAULT NULL,
    timezone VARCHAR(64) DEFAULT NULL,
    ip_hash CHAR(64) NOT NULL,
    user_agent VARCHAR(512) DEFAULT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_consent_log_consent_id (consent_id),
    KEY idx_consent_log_scope (scope),
    KEY idx_consent_log_decided_at (decided_at),
    KEY idx_consent_log_method (method)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Operational notes:
-- Consent scopes keep standalone landing pages separated. Main website: site.
-- App landing pages: app:{slug}, for example app:glanceaway.
-- Export a single consent record by consent_id via public/consent/export.php?token=...&consent_id=...
-- Export one channel via public/consent/export.php?token=...&scope=app:glanceaway
-- Delete a consent record by POSTing {"token":"...","consentId":"...","scope":"app:glanceaway"} to public/consent/delete.php.
-- Existing installations created before scope support need:
-- ALTER TABLE consent_log ADD COLUMN scope VARCHAR(128) NOT NULL DEFAULT 'site' AFTER policy_version;
-- ALTER TABLE consent_log ADD KEY idx_consent_log_scope (scope);
-- Retention policy in the privacy statement: usually up to 3 years from the end of the calendar year
-- in which the consent choice was made, unless longer storage is needed for a concrete request,
-- legal obligation, or legal defense.
