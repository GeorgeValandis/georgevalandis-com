<?php

declare(strict_types=1);

$configFile = __DIR__ . '/config.php';

if (!is_file($configFile)) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
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
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => false, 'error' => 'invalid_config']);
        exit;
    }
}

$token = $_GET['token'] ?? '';
if (!is_string($token) || !hash_equals((string) $config['export_token'], $token)) {
    http_response_code(403);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => 'forbidden']);
    exit;
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 1000;
$limit = max(1, min($limit, 5000));

$from = $_GET['from'] ?? null;
$to = $_GET['to'] ?? null;

$conditions = [];
$parameters = [];

if (is_string($from) && $from !== '') {
    try {
        $fromDate = new DateTimeImmutable($from);
        $conditions[] = 'decided_at >= :from_date';
        $parameters[':from_date'] = $fromDate->format('Y-m-d H:i:s');
    } catch (Throwable $exception) {
        http_response_code(422);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => false, 'error' => 'invalid_from']);
        exit;
    }
}

if (is_string($to) && $to !== '') {
    try {
        $toDate = new DateTimeImmutable($to);
        $conditions[] = 'decided_at <= :to_date';
        $parameters[':to_date'] = $toDate->format('Y-m-d H:i:s');
    } catch (Throwable $exception) {
        http_response_code(422);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => false, 'error' => 'invalid_to']);
        exit;
    }
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

    $sql = 'SELECT 
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
        user_agent,
        created_at
    FROM consent_log';

    if ($conditions !== []) {
        $sql .= ' WHERE ' . implode(' AND ', $conditions);
    }

    $sql .= ' ORDER BY decided_at DESC LIMIT ' . $limit;

    $statement = $pdo->prepare($sql);
    $statement->execute($parameters);

    $filename = 'consent-log-' . gmdate('Ymd-His') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');

    $output = fopen('php://output', 'wb');
    if ($output === false) {
        throw new RuntimeException('Could not open output stream.');
    }

    fputcsv($output, [
        'consent_id',
        'consent_version',
        'policy_version',
        'method',
        'necessary',
        'analytics',
        'marketing',
        'decided_at',
        'page_url',
        'locale',
        'timezone',
        'ip_hash',
        'user_agent',
        'created_at',
    ]);

    while ($row = $statement->fetch()) {
        fputcsv($output, $row);
    }

    fclose($output);
} catch (Throwable $exception) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => 'export_failed']);
}
