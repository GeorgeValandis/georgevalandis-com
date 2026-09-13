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
]);

if (!newsletter_is_bearer_authorized((string) $config['newsletter_admin_token'])) {
    newsletter_json_response(['ok' => false, 'error' => 'forbidden'], 403);
}

[$payload] = newsletter_read_json_body(4096);
$emailHash = null;
$subscriberId = newsletter_optional_string($payload['subscriberId'] ?? null, 64);

if (isset($payload['email'])) {
    if (!is_string($payload['email'])) {
        newsletter_json_response(['ok' => false, 'error' => 'invalid_email'], 422);
    }

    $email = newsletter_normalize_email($payload['email']);
    $emailHash = newsletter_email_hmac($email, (string) $config['newsletter_email_hash_salt']);
}

if ($emailHash === null && $subscriberId === null) {
    newsletter_json_response(['ok' => false, 'error' => 'missing_lookup'], 422);
}

try {
    $pdo = newsletter_database($config);
    $subscriber = newsletter_find_subscriber($pdo, $emailHash, $subscriberId);

    if (!is_array($subscriber)) {
        newsletter_json_response(['ok' => true, 'subscriber' => null, 'events' => []]);
    }

    $eventStatement = $pdo->prepare(
        'SELECT
            id,
            mailerlite_subscriber_id,
            provider_event,
            consent_event,
            provider_status,
            source,
            form_id,
            consent_version,
            privacy_version,
            occurred_at,
            received_at,
            opted_in_at,
            optin_ip_hash,
            created_at
         FROM newsletter_consent_event
         WHERE email_hmac = :email_hmac
            OR (:subscriber_id_filter IS NOT NULL AND mailerlite_subscriber_id = :subscriber_id_match)
         ORDER BY occurred_at ASC, id ASC'
    );
    $eventStatement->execute([
        ':email_hmac' => $subscriber['email_hmac'],
        ':subscriber_id_filter' => $subscriber['mailerlite_subscriber_id'],
        ':subscriber_id_match' => $subscriber['mailerlite_subscriber_id'],
    ]);

    $suppressionStatement = $pdo->prepare(
        'SELECT reason, suppressed_at, created_at, updated_at
         FROM newsletter_suppression
         WHERE email_hmac = :email_hmac
         LIMIT 1'
    );
    $suppressionStatement->execute([':email_hmac' => $subscriber['email_hmac']]);

    newsletter_json_response([
        'ok' => true,
        'subscriber' => $subscriber,
        'events' => $eventStatement->fetchAll(),
        'suppression' => $suppressionStatement->fetch() ?: null,
    ]);
} catch (Throwable $exception) {
    newsletter_json_response(['ok' => false, 'error' => 'export_failed'], 500);
}
