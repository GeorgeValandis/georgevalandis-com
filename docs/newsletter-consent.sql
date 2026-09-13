CREATE TABLE IF NOT EXISTS newsletter_subscriber (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email_hmac CHAR(64) DEFAULT NULL,
    mailerlite_subscriber_id VARCHAR(64) DEFAULT NULL,
    provider_status VARCHAR(32) DEFAULT NULL,
    consent_status VARCHAR(32) NOT NULL DEFAULT 'unknown',
    form_id VARCHAR(128) DEFAULT NULL,
    consent_version SMALLINT UNSIGNED DEFAULT NULL,
    privacy_version SMALLINT UNSIGNED DEFAULT NULL,
    requested_at DATETIME(6) DEFAULT NULL,
    confirmed_at DATETIME(6) DEFAULT NULL,
    withdrawn_at DATETIME(6) DEFAULT NULL,
    last_provider_event VARCHAR(64) DEFAULT NULL,
    last_event_at DATETIME(6) DEFAULT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_newsletter_subscriber_email_hmac (email_hmac),
    UNIQUE KEY uq_newsletter_subscriber_mailerlite_id (mailerlite_subscriber_id),
    KEY idx_newsletter_subscriber_status (consent_status),
    KEY idx_newsletter_subscriber_last_event (last_event_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_consent_event (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email_hmac CHAR(64) DEFAULT NULL,
    mailerlite_subscriber_id VARCHAR(64) DEFAULT NULL,
    provider_event VARCHAR(64) NOT NULL,
    consent_event VARCHAR(32) NOT NULL,
    provider_status VARCHAR(32) DEFAULT NULL,
    source VARCHAR(64) DEFAULT NULL,
    form_id VARCHAR(128) DEFAULT NULL,
    consent_version SMALLINT UNSIGNED DEFAULT NULL,
    privacy_version SMALLINT UNSIGNED DEFAULT NULL,
    occurred_at DATETIME(6) NOT NULL,
    received_at DATETIME(6) NOT NULL,
    opted_in_at DATETIME(6) DEFAULT NULL,
    optin_ip_hash CHAR(64) DEFAULT NULL,
    event_fingerprint CHAR(64) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_newsletter_event_fingerprint (event_fingerprint),
    KEY idx_newsletter_event_email_hmac (email_hmac),
    KEY idx_newsletter_event_mailerlite_id (mailerlite_subscriber_id),
    KEY idx_newsletter_event_consent_event (consent_event),
    KEY idx_newsletter_event_occurred_at (occurred_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_suppression (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email_hmac CHAR(64) NOT NULL,
    reason VARCHAR(64) NOT NULL,
    suppressed_at DATETIME(6) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_newsletter_suppression_email_hmac (email_hmac),
    KEY idx_newsletter_suppression_reason (reason)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Local records intentionally contain no raw subscriber email.
-- email_hmac is HMAC-SHA-256(email, newsletter_email_hash_salt) and remains
-- personal data; it only avoids duplicating the raw address locally.
-- newsletter_suppression is reserved for a documented erasure/blocking case.
-- A normal unsubscribe is represented by withdrawn consent and may be followed
-- by a fresh, separately recorded double opt-in.
