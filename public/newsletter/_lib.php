<?php

declare(strict_types=1);

/**
 * Shared helpers for the server-side newsletter consent endpoints.
 *
 * This file intentionally never stores or returns the raw subscriber email.
 * The raw address is used only in memory for a MailerLite API request and is
 * converted to an HMAC before local persistence.
 */

function newsletter_json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function newsletter_require_config(array $requiredKeys): array
{
    $configFile = dirname(__DIR__) . '/consent/config.php';

    if (!is_file($configFile)) {
        newsletter_json_response(['ok' => false, 'error' => 'missing_config'], 503);
    }

    $config = require $configFile;

    if (!is_array($config)) {
        newsletter_json_response(['ok' => false, 'error' => 'invalid_config'], 503);
    }

    foreach ($requiredKeys as $key) {
        if (!array_key_exists($key, $config) || $config[$key] === '') {
            newsletter_json_response(['ok' => false, 'error' => 'invalid_config'], 503);
        }
    }

    return $config;
}

function newsletter_database(array $config): PDO
{
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        (int) $config['db_port'],
        $config['db_name']
    );

    return new PDO($dsn, (string) $config['db_user'], (string) $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

function newsletter_read_json_body(int $maxBytes = 262144): array
{
    $contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;

    if ($contentLength > $maxBytes) {
        newsletter_json_response(['ok' => false, 'error' => 'payload_too_large'], 413);
    }

    $rawBody = file_get_contents('php://input');

    if ($rawBody === false || strlen($rawBody) > $maxBytes) {
        newsletter_json_response(['ok' => false, 'error' => 'payload_too_large'], 413);
    }

    $payload = json_decode($rawBody ?: '', true);

    if (!is_array($payload)) {
        newsletter_json_response(['ok' => false, 'error' => 'invalid_json'], 400);
    }

    return [$payload, $rawBody];
}

function newsletter_header(string $name): string
{
    $serverKey = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
    return trim((string) ($_SERVER[$serverKey] ?? ''));
}

function newsletter_is_bearer_authorized(string $expectedToken): bool
{
    $authorization = newsletter_header('Authorization');

    if (stripos($authorization, 'Bearer ') !== 0) {
        return false;
    }

    return hash_equals($expectedToken, trim(substr($authorization, 7)));
}

function newsletter_normalize_email(string $email): string
{
    $normalized = strtolower(trim($email));

    if ($normalized === '' || strlen($normalized) > 254 || filter_var($normalized, FILTER_VALIDATE_EMAIL) === false) {
        newsletter_json_response(['ok' => false, 'error' => 'invalid_email'], 422);
    }

    return $normalized;
}

function newsletter_email_hmac(string $email, string $salt): string
{
    return hash_hmac('sha256', $email, $salt);
}

function newsletter_optional_string($value, int $maxLength): ?string
{
    if (!is_string($value) || $value === '') {
        return null;
    }

    return substr($value, 0, $maxLength);
}

function newsletter_utc_timestamp($value, ?string $fallback = null): ?string
{
    if (!is_string($value) || $value === '') {
        return $fallback;
    }

    try {
        return (new DateTimeImmutable($value))
            ->setTimezone(new DateTimeZone('UTC'))
            ->format('Y-m-d H:i:s.u');
    } catch (Throwable $exception) {
        return $fallback;
    }
}

function newsletter_now(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format('Y-m-d H:i:s.u');
}

function newsletter_extract_subscriber(array $payload): array
{
    $subscriber = isset($payload['subscriber']) && is_array($payload['subscriber'])
        ? $payload['subscriber']
        : $payload;

    $eventType = newsletter_optional_string($payload['event'] ?? $payload['type'] ?? $subscriber['event'] ?? null, 64);

    return [
        'event_type' => $eventType,
        'id' => newsletter_optional_string($subscriber['id'] ?? null, 64),
        'email' => newsletter_optional_string($subscriber['email'] ?? null, 254),
        'status' => newsletter_optional_string($subscriber['status'] ?? null, 32),
        'source' => newsletter_optional_string($subscriber['source'] ?? null, 64),
        'subscribed_at' => newsletter_utc_timestamp($subscriber['subscribed_at'] ?? null),
        'unsubscribed_at' => newsletter_utc_timestamp($subscriber['unsubscribed_at'] ?? null),
        'created_at' => newsletter_utc_timestamp($subscriber['created_at'] ?? null),
        'updated_at' => newsletter_utc_timestamp($subscriber['updated_at'] ?? null),
        'opted_in_at' => newsletter_utc_timestamp($subscriber['opted_in_at'] ?? null),
        'optin_ip' => newsletter_optional_string($subscriber['optin_ip'] ?? null, 128),
    ];
}

function newsletter_find_subscriber(PDO $pdo, ?string $emailHash, ?string $subscriberId): ?array
{
    if ($subscriberId !== null) {
        $statement = $pdo->prepare(
            'SELECT * FROM newsletter_subscriber WHERE mailerlite_subscriber_id = :subscriber_id LIMIT 1'
        );
        $statement->execute([':subscriber_id' => $subscriberId]);
        $row = $statement->fetch();

        if (is_array($row)) {
            return $row;
        }
    }

    if ($emailHash !== null) {
        $statement = $pdo->prepare(
            'SELECT * FROM newsletter_subscriber WHERE email_hmac = :email_hmac LIMIT 1'
        );
        $statement->execute([':email_hmac' => $emailHash]);
        $row = $statement->fetch();

        if (is_array($row)) {
            return $row;
        }
    }

    return null;
}

function newsletter_insert_event(PDO $pdo, array $event): bool
{
    $statement = $pdo->prepare(
        'INSERT INTO newsletter_consent_event (
            email_hmac,
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
            event_fingerprint
        ) VALUES (
            :email_hmac,
            :subscriber_id,
            :provider_event,
            :consent_event,
            :provider_status,
            :source,
            :form_id,
            :consent_version,
            :privacy_version,
            :occurred_at,
            :received_at,
            :opted_in_at,
            :optin_ip_hash,
            :event_fingerprint
        )'
    );

    try {
        $statement->execute([
            ':email_hmac' => $event['email_hmac'],
            ':subscriber_id' => $event['subscriber_id'],
            ':provider_event' => $event['provider_event'],
            ':consent_event' => $event['consent_event'],
            ':provider_status' => $event['provider_status'],
            ':source' => $event['source'],
            ':form_id' => $event['form_id'],
            ':consent_version' => $event['consent_version'],
            ':privacy_version' => $event['privacy_version'],
            ':occurred_at' => $event['occurred_at'],
            ':received_at' => $event['received_at'],
            ':opted_in_at' => $event['opted_in_at'],
            ':optin_ip_hash' => $event['optin_ip_hash'],
            ':event_fingerprint' => $event['event_fingerprint'],
        ]);
    } catch (PDOException $exception) {
        if ($exception->getCode() === '23000') {
            return false;
        }

        throw $exception;
    }

    return true;
}

function newsletter_upsert_subscriber(PDO $pdo, array $subscriber): void
{
    if ($subscriber['email_hmac'] === null && $subscriber['subscriber_id'] === null) {
        return;
    }

    $statement = $pdo->prepare(
        'INSERT INTO newsletter_subscriber (
            email_hmac,
            mailerlite_subscriber_id,
            provider_status,
            consent_status,
            form_id,
            consent_version,
            privacy_version,
            requested_at,
            confirmed_at,
            withdrawn_at,
            last_provider_event,
            last_event_at,
            created_at,
            updated_at
        ) VALUES (
            :email_hmac,
            :subscriber_id,
            :provider_status,
            :consent_status,
            :form_id,
            :consent_version,
            :privacy_version,
            :requested_at,
            :confirmed_at,
            :withdrawn_at,
            :provider_event,
            :last_event_at,
            :created_at,
            :updated_at
        )
        ON DUPLICATE KEY UPDATE
            email_hmac = COALESCE(VALUES(email_hmac), email_hmac),
            mailerlite_subscriber_id = COALESCE(VALUES(mailerlite_subscriber_id), mailerlite_subscriber_id),
            provider_status = COALESCE(VALUES(provider_status), provider_status),
            consent_status = COALESCE(VALUES(consent_status), consent_status),
            form_id = COALESCE(VALUES(form_id), form_id),
            consent_version = COALESCE(VALUES(consent_version), consent_version),
            privacy_version = COALESCE(VALUES(privacy_version), privacy_version),
            requested_at = COALESCE(VALUES(requested_at), requested_at),
            confirmed_at = CASE
                WHEN :clear_confirmed = 1 THEN VALUES(confirmed_at)
                ELSE COALESCE(VALUES(confirmed_at), confirmed_at)
            END,
            withdrawn_at = CASE
                WHEN :clear_withdrawn = 1 THEN VALUES(withdrawn_at)
                ELSE COALESCE(VALUES(withdrawn_at), withdrawn_at)
            END,
            last_provider_event = VALUES(last_provider_event),
            last_event_at = VALUES(last_event_at),
            updated_at = VALUES(updated_at)'
    );

    $statement->execute([
        ':email_hmac' => $subscriber['email_hmac'],
        ':subscriber_id' => $subscriber['subscriber_id'],
        ':provider_status' => $subscriber['provider_status'],
        ':consent_status' => $subscriber['consent_status'] ?? 'unknown',
        ':form_id' => $subscriber['form_id'],
        ':consent_version' => $subscriber['consent_version'],
        ':privacy_version' => $subscriber['privacy_version'],
        ':requested_at' => $subscriber['requested_at'],
        ':confirmed_at' => $subscriber['confirmed_at'],
        ':withdrawn_at' => $subscriber['withdrawn_at'],
        ':provider_event' => $subscriber['provider_event'],
        ':last_event_at' => $subscriber['last_event_at'],
        ':created_at' => $subscriber['created_at'],
        ':updated_at' => $subscriber['updated_at'],
        ':clear_confirmed' => (int) ($subscriber['clear_confirmed'] ?? 0),
        ':clear_withdrawn' => (int) ($subscriber['clear_withdrawn'] ?? 0),
    ]);
}

function newsletter_mailerlite_request(array $config, string $method, string $path, ?array $body = null): array
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('curl_extension_missing');
    }

    $url = 'https://connect.mailerlite.com/api/' . ltrim($path, '/');
    $curl = curl_init($url);

    if ($curl === false) {
        throw new RuntimeException('curl_init_failed');
    }

    $headers = [
        'Authorization: Bearer ' . (string) $config['mailerlite_api_token'],
        'Accept: application/json',
        'Content-Type: application/json',
    ];

    curl_setopt_array($curl, [
        CURLOPT_CUSTOMREQUEST => strtoupper($method),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    if ($body !== null) {
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_SLASHES));
    }

    $rawResponse = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    if ($rawResponse === false || $error !== '') {
        throw new RuntimeException('mailerlite_request_failed');
    }

    $decoded = json_decode($rawResponse, true);

    return [
        'status' => $status,
        'body' => is_array($decoded) ? $decoded : [],
    ];
}
