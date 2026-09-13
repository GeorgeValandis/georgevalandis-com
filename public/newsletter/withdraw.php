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
    'newsletter_admin_token',
    'newsletter_form_id',
    'newsletter_consent_version',
    'newsletter_privacy_version',
    'mailerlite_api_token',
]);

if (!newsletter_is_bearer_authorized((string) $config['newsletter_admin_token'])) {
    newsletter_json_response(['ok' => false, 'error' => 'forbidden'], 403);
}

[$payload] = newsletter_read_json_body(4096);
$emailValue = $payload['email'] ?? null;

if (!is_string($emailValue)) {
    newsletter_json_response(['ok' => false, 'error' => 'missing_email'], 422);
}

$email = newsletter_normalize_email($emailValue);
$emailHash = newsletter_email_hmac($email, (string) $config['newsletter_email_hash_salt']);
$now = newsletter_now();
$apiNow = substr($now, 0, 19);
$providerFound = false;
$providerSubscriberId = null;
$providerStatus = 'not_found';

try {
    $lookup = newsletter_mailerlite_request(
        $config,
        'GET',
        'subscribers/' . rawurlencode($email)
    );

    if ($lookup['status'] === 200 && isset($lookup['body']['data']) && is_array($lookup['body']['data'])) {
        $providerFound = true;
        $providerSubscriberId = newsletter_optional_string($lookup['body']['data']['id'] ?? null, 64);
        $providerStatus = newsletter_optional_string($lookup['body']['data']['status'] ?? null, 32) ?? 'unknown';

        if ($providerSubscriberId === null) {
            newsletter_json_response(['ok' => false, 'error' => 'provider_missing_subscriber_id'], 502);
        }

        if ($providerStatus !== 'unsubscribed') {
            $update = newsletter_mailerlite_request(
                $config,
                'PUT',
                'subscribers/' . rawurlencode($providerSubscriberId),
                [
                    'status' => 'unsubscribed',
                    'unsubscribed_at' => $apiNow,
                ]
            );

            if ($update['status'] < 200 || $update['status'] >= 300) {
                newsletter_json_response(['ok' => false, 'error' => 'provider_update_failed'], 502);
            }

            $providerStatus = 'unsubscribed';
        }
    } elseif ($lookup['status'] !== 404) {
        newsletter_json_response(['ok' => false, 'error' => 'provider_lookup_failed'], 502);
    }
} catch (Throwable $exception) {
    newsletter_json_response(['ok' => false, 'error' => 'provider_request_failed'], 502);
}

try {
    $pdo = newsletter_database($config);
    $pdo->beginTransaction();
    $existing = newsletter_find_subscriber($pdo, $emailHash, $providerSubscriberId);
    $localSubscriberId = $providerSubscriberId ?? (is_array($existing) ? ($existing['mailerlite_subscriber_id'] ?? null) : null);
    $eventFingerprint = hash('sha256', 'manual-withdrawal|' . $emailHash . '|' . bin2hex(random_bytes(16)));

    newsletter_insert_event($pdo, [
        'email_hmac' => $emailHash,
        'subscriber_id' => $localSubscriberId,
        'provider_event' => 'manual.withdrawal',
        'consent_event' => 'withdrawn',
        'provider_status' => $providerStatus,
        'source' => 'manual_email_request',
        'form_id' => (string) $config['newsletter_form_id'],
        'consent_version' => (int) $config['newsletter_consent_version'],
        'privacy_version' => (int) $config['newsletter_privacy_version'],
        'occurred_at' => $now,
        'received_at' => $now,
        'opted_in_at' => null,
        'optin_ip_hash' => null,
        'event_fingerprint' => $eventFingerprint,
    ]);

    newsletter_upsert_subscriber($pdo, [
        'email_hmac' => $emailHash,
        'subscriber_id' => $localSubscriberId,
        'provider_status' => $providerStatus,
        'consent_status' => 'withdrawn',
        'form_id' => (string) $config['newsletter_form_id'],
        'consent_version' => (int) $config['newsletter_consent_version'],
        'privacy_version' => (int) $config['newsletter_privacy_version'],
        'requested_at' => null,
        'confirmed_at' => null,
        'withdrawn_at' => $now,
        'provider_event' => 'manual.withdrawal',
        'last_event_at' => $now,
        'created_at' => $now,
        'updated_at' => $now,
        'clear_confirmed' => 0,
        'clear_withdrawn' => 0,
    ]);

    $pdo->commit();

    newsletter_json_response([
        'ok' => true,
        'provider_updated' => $providerFound,
        'local_recorded' => true,
    ]);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    newsletter_json_response(['ok' => false, 'error' => 'storage_failed'], 500);
}
