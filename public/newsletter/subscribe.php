<?php

declare(strict_types=1);

require_once __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    newsletter_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$config = newsletter_require_config([
    'db_host',
    'db_port',
    'db_name',
    'db_user',
    'db_pass',
    'newsletter_email_hash_salt',
    'newsletter_ip_hash_salt',
    'newsletter_form_id',
    'newsletter_consent_version',
    'newsletter_privacy_version',
]);

[$payload] = newsletter_read_json_body(8192);

if (($payload['consent'] ?? null) !== true) {
    newsletter_json_response(['ok' => false, 'error' => 'consent_required'], 422);
}

if (($payload['method'] ?? null) !== 'subscribe_button') {
    newsletter_json_response(['ok' => false, 'error' => 'invalid_consent_method'], 422);
}

$submissionId = newsletter_optional_string($payload['submissionId'] ?? null, 64);
if ($submissionId === null || !preg_match('/\A[a-z0-9-]{16,64}\z/i', $submissionId)) {
    newsletter_json_response(['ok' => false, 'error' => 'invalid_submission_id'], 422);
}

$emailValue = $payload['email'] ?? null;
if (!is_string($emailValue)) {
    newsletter_json_response(['ok' => false, 'error' => 'invalid_email'], 422);
}

$email = newsletter_normalize_email($emailValue);
$emailHash = newsletter_email_hmac($email, (string) $config['newsletter_email_hash_salt']);
$receivedAt = newsletter_now();
$clientIp = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
$optinIpHash = $clientIp === ''
    ? null
    : hash_hmac('sha256', $clientIp, (string) $config['newsletter_ip_hash_salt']);
$eventFingerprint = hash('sha256', 'website.subscribe|' . $submissionId . '|' . $emailHash);

try {
    $pdo = newsletter_database($config);
    $pdo->beginTransaction();

    $existing = newsletter_find_subscriber($pdo, $emailHash, null);
    $subscriberId = is_array($existing) ? ($existing['mailerlite_subscriber_id'] ?? null) : null;

    $inserted = newsletter_insert_event($pdo, [
        'email_hmac' => $emailHash,
        'subscriber_id' => $subscriberId,
        'provider_event' => 'website.subscribe',
        'consent_event' => 'signup_requested',
        'provider_status' => null,
        'source' => 'website.subscribe_button',
        'form_id' => (string) $config['newsletter_form_id'],
        'consent_version' => (int) $config['newsletter_consent_version'],
        'privacy_version' => (int) $config['newsletter_privacy_version'],
        'occurred_at' => $receivedAt,
        'received_at' => $receivedAt,
        'opted_in_at' => null,
        'optin_ip_hash' => $optinIpHash,
        'event_fingerprint' => $eventFingerprint,
    ]);

    if (!$inserted) {
        $pdo->rollBack();
        newsletter_json_response([
            'ok' => true,
            'duplicate' => true,
            'event' => 'signup_requested',
            'requires_confirmation' => true,
        ]);
    }

    newsletter_upsert_subscriber($pdo, [
        'email_hmac' => $emailHash,
        'subscriber_id' => $subscriberId,
        'provider_status' => null,
        'consent_status' => 'pending',
        'form_id' => (string) $config['newsletter_form_id'],
        'consent_version' => (int) $config['newsletter_consent_version'],
        'privacy_version' => (int) $config['newsletter_privacy_version'],
        'requested_at' => $receivedAt,
        'confirmed_at' => null,
        'withdrawn_at' => null,
        'provider_event' => 'website.subscribe',
        'last_event_at' => $receivedAt,
        'created_at' => $receivedAt,
        'updated_at' => $receivedAt,
        'clear_confirmed' => 1,
        'clear_withdrawn' => 1,
    ]);

    $pdo->commit();

    newsletter_json_response([
        'ok' => true,
        'stored' => true,
        'event' => 'signup_requested',
        'requires_confirmation' => true,
    ]);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    newsletter_json_response(['ok' => false, 'error' => 'storage_failed'], 500);
}
