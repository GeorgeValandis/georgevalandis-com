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

$requiredConfigKeys = [
    'db_host',
    'db_port',
    'db_name',
    'db_user',
    'db_pass',
    'export_token',
];

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

$token = $payload['token'] ?? '';
$consentId = $payload['consentId'] ?? '';
$scope = $payload['scope'] ?? null;

if (!is_string($token) || !hash_equals((string) $config['export_token'], $token)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden']);
    exit;
}

if (!is_string($consentId) || strlen($consentId) < 8) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_consent_id']);
    exit;
}

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

    if (is_string($scope) && $scope !== '') {
        $statement = $pdo->prepare(
            'DELETE FROM consent_log WHERE consent_id = :consent_id AND scope = :scope'
        );
        $statement->execute([
            ':consent_id' => $consentId,
            ':scope' => substr($scope, 0, 128),
        ]);
    } else {
        $statement = $pdo->prepare('DELETE FROM consent_log WHERE consent_id = :consent_id');
        $statement->execute([':consent_id' => $consentId]);
    }

    echo json_encode(['ok' => true, 'removed' => $statement->rowCount()]);
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'delete_failed']);
}
