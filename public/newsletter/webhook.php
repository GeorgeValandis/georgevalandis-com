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
    'newsletter_webhook_secret',
    'newsletter_email_hash_salt',
    'newsletter_ip_hash_salt',
    'newsletter_form_id',
    'newsletter_consent_version',
    'newsletter_privacy_version',
]);

[$payload, $rawBody] = newsletter_read_json_body();
$signature = newsletter_header('Signature');
$expectedSignature = hash_hmac('sha256', $rawBody, (string) $config['newsletter_webhook_secret']);

if ($signature === '' || !hash_equals($expectedSignature, $signature)) {
    newsletter_json_response(['ok' => false, 'error' => 'invalid_signature'], 401);
}

$subscriber = newsletter_extract_subscriber($payload);
$providerEvent = $subscriber['event_type'];
$allowedEvents = [
    'subscriber.created',
    'subscriber.updated',
    'subscriber.unsubscribed',
    'subscriber.active',
];

if ($providerEvent === null || !in_array($providerEvent, $allowedEvents, true)) {
    newsletter_json_response([
        'ok' => true,
        'ignored' => true,
        'reason' => 'unsupported_event',
    ]);
}

if ($subscriber['id'] === null && $subscriber['email'] === null) {
    newsletter_json_response(['ok' => false, 'error' => 'missing_subscriber_identity'], 422);
}

$emailHash = null;
if ($subscriber['email'] !== null) {
    $normalizedEmail = newsletter_normalize_email($subscriber['email']);
    $emailHash = newsletter_email_hmac($normalizedEmail, (string) $config['newsletter_email_hash_salt']);
}

$eventFingerprint = hash('sha256', $rawBody);
$receivedAt = newsletter_now();
$occurredAt = $subscriber['updated_at']
    ?? $subscriber['unsubscribed_at']
    ?? $subscriber['opted_in_at']
    ?? $subscriber['subscribed_at']
    ?? $subscriber['created_at']
    ?? $receivedAt;
$optedInAt = $subscriber['opted_in_at'];
$optinIpHash = $subscriber['optin_ip'] !== null
    ? hash_hmac('sha256', $subscriber['optin_ip'], (string) $config['newsletter_ip_hash_salt'])
    : null;

try {
    $pdo = newsletter_database($config);
    $pdo->beginTransaction();

    $existing = newsletter_find_subscriber($pdo, $emailHash, $subscriber['id']);

    $consentEvent = 'provider_sync';
    $consentStatus = null;
    $requestedAt = null;
    $confirmedAt = null;
    $withdrawnAt = null;

    if ($providerEvent === 'subscriber.unsubscribed') {
        $consentEvent = 'withdrawn';
        $consentStatus = 'withdrawn';
        $withdrawnAt = $occurredAt;
    } elseif (
        $subscriber['status'] === 'unconfirmed'
        || ($providerEvent === 'subscriber.created' && $subscriber['opted_in_at'] === null)
    ) {
        $consentEvent = 'signup_requested';
        $consentStatus = 'pending';
        $requestedAt = $subscriber['subscribed_at'] ?? $occurredAt;
    } elseif ($subscriber['opted_in_at'] !== null) {
        $alreadyConfirmedAt = is_array($existing) ? ($existing['confirmed_at'] ?? null) : null;
        $isNewConfirmation = $alreadyConfirmedAt === null || $alreadyConfirmedAt !== $subscriber['opted_in_at'];

        if ($isNewConfirmation) {
            $consentEvent = 'doi_confirmed';
            $consentStatus = 'confirmed';
            $confirmedAt = $subscriber['opted_in_at'];
        } elseif (is_array($existing) && ($existing['consent_status'] ?? null) === 'withdrawn') {
            $consentStatus = 'withdrawn';
            $withdrawnAt = $existing['withdrawn_at'] ?? null;
        }
    }

    $localEmailHash = $emailHash ?? (is_array($existing) ? ($existing['email_hmac'] ?? null) : null);
    $subscriberId = $subscriber['id'] ?? (is_array($existing) ? ($existing['mailerlite_subscriber_id'] ?? null) : null);
    $event = [
        'email_hmac' => $localEmailHash,
        'subscriber_id' => $subscriberId,
        'provider_event' => $providerEvent,
        'consent_event' => $consentEvent,
        'provider_status' => $subscriber['status'],
        'source' => $subscriber['source'],
        'form_id' => (string) $config['newsletter_form_id'],
        'consent_version' => (int) $config['newsletter_consent_version'],
        'privacy_version' => (int) $config['newsletter_privacy_version'],
        'occurred_at' => $occurredAt,
        'received_at' => $receivedAt,
        'opted_in_at' => $optedInAt,
        'optin_ip_hash' => $optinIpHash,
        'event_fingerprint' => $eventFingerprint,
    ];

    $inserted = newsletter_insert_event($pdo, $event);

    if (!$inserted) {
        $pdo->rollBack();
        newsletter_json_response(['ok' => true, 'duplicate' => true]);
    }

    newsletter_upsert_subscriber($pdo, [
        'email_hmac' => $localEmailHash,
        'subscriber_id' => $subscriberId,
        'provider_status' => $subscriber['status'],
        'consent_status' => $consentStatus,
        'form_id' => (string) $config['newsletter_form_id'],
        'consent_version' => (int) $config['newsletter_consent_version'],
        'privacy_version' => (int) $config['newsletter_privacy_version'],
        'requested_at' => $requestedAt,
        'confirmed_at' => $confirmedAt,
        'withdrawn_at' => $withdrawnAt,
        'provider_event' => $providerEvent,
        'last_event_at' => $occurredAt,
        'created_at' => $receivedAt,
        'updated_at' => $receivedAt,
        'clear_confirmed' => $consentEvent === 'signup_requested' ? 1 : 0,
        'clear_withdrawn' => in_array($consentEvent, ['signup_requested', 'doi_confirmed'], true) ? 1 : 0,
    ]);

    $pdo->commit();

    newsletter_json_response([
        'ok' => true,
        'event' => $consentEvent,
        'stored' => true,
    ]);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    newsletter_json_response(['ok' => false, 'error' => 'storage_failed'], 500);
}
