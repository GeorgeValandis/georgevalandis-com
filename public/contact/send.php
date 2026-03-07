<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    $data = $_POST;
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function clean_string(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim(str_replace(["\r", "\n", "\0"], ' ', $value));
    if ($value === '') {
        return '';
    }

    return mb_substr($value, 0, $maxLength);
}

$name = clean_string($data['name'] ?? '', 120);
$email = clean_string($data['email'] ?? '', 190);
$message = trim((string) ($data['message'] ?? ''));
$website = clean_string($data['website'] ?? '', 200);

if ($website !== '') {
    respond(200, ['ok' => true]);
}

if ($name === '' || $message === '') {
    respond(422, ['ok' => false, 'error' => 'missing_fields']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'invalid_email']);
}

$message = str_replace(["\r\n", "\r"], "\n", $message);
$message = trim($message);

if ($message === '' || mb_strlen($message) < 10) {
    respond(422, ['ok' => false, 'error' => 'message_too_short']);
}

$recipient = 'info@georgevalandis.com';
$subject = 'Website contact form: ' . $name;
$replyTo = str_replace(["\r", "\n"], '', $email);
$visitorIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_HOST'] ?? 'unknown');

$body = implode("\n", [
    'New website message',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Origin: ' . $origin,
    'IP: ' . $visitorIp,
    'User-Agent: ' . $userAgent,
    '',
    'Message:',
    $message,
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: GeorgeValandis.com <info@georgevalandis.com>',
    'Reply-To: ' . $replyTo,
    'X-Website-Form: georgevalandis.com',
];

$sent = mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'mail_failed']);
}

respond(200, ['ok' => true]);
