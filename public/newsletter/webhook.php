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
    'subscriber.deleted',
    'subscriber.bounced',
    'subscriber.spam_reported',
];
// Events that end the subscription. They are evaluated by event type first, because
// MailerLite payloads for these events can still carry status "active".
$removalEvents = [
    'subscriber.unsubscribed' => 'withdrawn',
    'subscriber.deleted' => 'deleted',
    'subscriber.bounced' => 'bounced',
    'subscriber.spam_reported' => 'spam_reported',
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
$isRemovalEvent = isset($removalEvents[$providerEvent]);
// Time of the provider-side change, used to order events (all values are UTC 'Y-m-d H:i:s.u').
$occurredAt = $isRemovalEvent
    ? ($subscriber['unsubscribed_at']
        ?? $subscriber['updated_at']
        ?? $receivedAt)
    : ($subscriber['updated_at']
        ?? $subscriber['opted_in_at']
        ?? $subscriber['subscribed_at']
        ?? $subscriber['created_at']
        ?? $receivedAt);
$optedInAt = $subscriber['opted_in_at'];
$optinIpHash = $subscriber['optin_ip'] !== null
    ? hash_hmac('sha256', $subscriber['optin_ip'], (string) $config['newsletter_ip_hash_salt'])
    : null;

try {
    $pdo = newsletter_database($config);
    $pdo->beginTransaction();

    $existing = newsletter_find_subscriber($pdo, $emailHash, $subscriber['id']);
    $existingConsentStatus = is_array($existing) ? ($existing['consent_status'] ?? null) : null;
    $existingConfirmedAt = is_array($existing) ? ($existing['confirmed_at'] ?? null) : null;
    $existingWithdrawnAt = is_array($existing) ? ($existing['withdrawn_at'] ?? null) : null;
    $existingLastEventAt = is_array($existing) ? ($existing['last_event_at'] ?? null) : null;
    $hasExistingConfirmedConsent = $existingConsentStatus === 'confirmed' && $existingConfirmedAt !== null;
    $isProviderUnconfirmed = strcasecmp((string) ($subscriber['status'] ?? ''), 'unconfirmed') === 0;
    // An opt-in only counts as confirmation if it happened after the last removal;
    // otherwise it is the old opt-in of a contact that has since unsubscribed.
    $hasFreshOptIn = $optedInAt !== null
        && ($existingWithdrawnAt === null || strcmp((string) $optedInAt, (string) $existingWithdrawnAt) > 0);
    // Delayed or retried deliveries must not roll back a newer local state.
    $isStale = $existingLastEventAt !== null && strcmp($occurredAt, (string) $existingLastEventAt) < 0;

    $consentEvent = 'provider_sync';
    $consentStatus = null;
    $requestedAt = null;
    $confirmedAt = null;
    $withdrawnAt = null;

    if ($isRemovalEvent) {
        $consentStatus = $removalEvents[$providerEvent];
        $consentEvent = $consentStatus;
        $withdrawnAt = $occurredAt;
    } elseif ($hasFreshOptIn) {
        // Only MailerLite's recorded opt-in time is evidence of a double opt-in.
        // "active" without opted_in_at (imports, manual adds) is not.
        $isNewConfirmation = !$hasExistingConfirmedConsent || $existingConfirmedAt !== $optedInAt;
        $consentEvent = $isNewConfirmation ? 'doi_confirmed' : 'provider_sync';
        $consentStatus = 'confirmed';
        $confirmedAt = $optedInAt;
    } elseif (
        $isProviderUnconfirmed
        || ($providerEvent === 'subscriber.created' && $optedInAt === null)
    ) {
        if (!$hasExistingConfirmedConsent) {
            $consentEvent = 'signup_requested';
            $consentStatus = 'pending';
            $requestedAt = $subscriber['subscribed_at'] ?? $occurredAt;
        }
    }

    $localEmailHash = $emailHash ?? (is_array($existing) ? ($existing['email_hmac'] ?? null) : null);
    $subscriberId = $subscriber['id'] ?? (is_array($existing) ? ($existing['mailerlite_subscriber_id'] ?? null) : null);
    // Form and consent/privacy versions describe the website click recorded by subscribe.php.
    // Provider events are not tied to that click, so they do not carry or overwrite them.
    $event = [
        'email_hmac' => $localEmailHash,
        'subscriber_id' => $subscriberId,
        'provider_event' => $providerEvent,
        'consent_event' => $isStale ? 'stale_ignored' : $consentEvent,
        'provider_status' => $subscriber['status'],
        'source' => $subscriber['source'],
        'form_id' => null,
        'consent_version' => null,
        'privacy_version' => null,
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

    if ($isStale) {
        $pdo->commit();
        newsletter_json_response(['ok' => true, 'stale' => true, 'stored' => true]);
    }

    newsletter_upsert_subscriber($pdo, [
        'email_hmac' => $localEmailHash,
        'subscriber_id' => $subscriberId,
        'provider_status' => $subscriber['status'],
        'consent_status' => $consentStatus,
        'form_id' => null,
        'consent_version' => null,
        'privacy_version' => null,
        'requested_at' => $requestedAt,
        'confirmed_at' => $confirmedAt,
        'withdrawn_at' => $withdrawnAt,
        'provider_event' => $providerEvent,
        'last_event_at' => $occurredAt,
        'created_at' => $receivedAt,
        'updated_at' => $receivedAt,
        // A removal ends the confirmation; a fresh opt-in ends the removal.
        'clear_confirmed' => $isRemovalEvent ? 1 : 0,
        'clear_withdrawn' => $consentEvent === 'doi_confirmed' ? 1 : 0,
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
