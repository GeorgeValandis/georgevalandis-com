<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$configFile = __DIR__ . '/config.php';

if (!is_file($configFile)) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'missing_config']);
    exit;
}

$config = require $configFile;

$requiredConfigKeys = ['db_host', 'db_port', 'db_name', 'db_user', 'db_pass', 'hash_salt'];
foreach ($requiredConfigKeys as $key) {
    if (!isset($config[$key]) || $config[$key] === '') {
        http_response_code(503);
        echo json_encode(['ok' => false, 'error' => 'invalid_config']);
        exit;
    }
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

$requiredPayloadKeys = [
    'consentId',
    'consentVersion',
    'policyVersion',
    'method',
    'necessary',
    'analytics',
    'marketing',
    'decidedAt',
];

foreach ($requiredPayloadKeys as $key) {
    if (!array_key_exists($key, $payload)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'missing_field', 'field' => $key]);
        exit;
    }
}

$allowedMethods = ['accept_all', 'reject_all', 'save_selection'];
if (!in_array($payload['method'], $allowedMethods, true)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_method']);
    exit;
}

try {
    $decidedAt = new DateTimeImmutable((string) $payload['decidedAt']);
} catch (Throwable $exception) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_timestamp']);
    exit;
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
$ipHash = hash_hmac('sha256', $clientIp, (string) $config['hash_salt']);
$userAgent = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 512);
$pageUrl = isset($payload['pageUrl']) ? substr((string) $payload['pageUrl'], 0, 2048) : null;
$locale = isset($payload['locale']) ? substr((string) $payload['locale'], 0, 32) : null;
$timezone = isset($payload['timezone']) ? substr((string) $payload['timezone'], 0, 64) : null;

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        (int) $config['db_port'],
        $config['db_name']
    );

    $pdo = new PDO($dsn, (string) $config['db_user'], (string) $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $statement = $pdo->prepare(
        'INSERT INTO consent_log (
            consent_id,
            consent_version,
            policy_version,
            method,
            necessary,
            analytics,
            marketing,
            decided_at,
            page_url,
            locale,
            timezone,
            ip_hash,
            user_agent
        ) VALUES (
            :consent_id,
            :consent_version,
            :policy_version,
            :method,
            :necessary,
            :analytics,
            :marketing,
            :decided_at,
            :page_url,
            :locale,
            :timezone,
            :ip_hash,
            :user_agent
        )'
    );

    $statement->execute([
        ':consent_id' => (string) $payload['consentId'],
        ':consent_version' => (int) $payload['consentVersion'],
        ':policy_version' => (int) $payload['policyVersion'],
        ':method' => (string) $payload['method'],
        ':necessary' => (int) ((bool) $payload['necessary']),
        ':analytics' => (int) ((bool) $payload['analytics']),
        ':marketing' => (int) ((bool) $payload['marketing']),
        ':decided_at' => $decidedAt->format('Y-m-d H:i:s.u'),
        ':page_url' => $pageUrl,
        ':locale' => $locale,
        ':timezone' => $timezone,
        ':ip_hash' => $ipHash,
        ':user_agent' => $userAgent,
    ]);

    echo json_encode(['ok' => true]);
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'storage_failed']);
}
