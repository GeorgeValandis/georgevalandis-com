<?php

declare(strict_types=1);

const APP_STORE_URL = 'https://apps.apple.com/us/app/eye-break-glanceaway/id6751297230';
const APP_STORE_PROVIDER_TOKEN = '126900140';
const MAX_CAMPAIGN_BUCKETS = 5000;

function campaign_token(mixed $value, string $fallback): string
{
    if (!is_string($value) || !preg_match('/^[A-Za-z0-9_-]{1,30}$/', $value)) {
        return $fallback;
    }

    return $value;
}

function record_aggregate_click(string $source, string $campaign): void
{
    $file = __DIR__ . '/.download-click-counts.json';
    $handle = @fopen($file, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return;
    }

    $raw = stream_get_contents($handle);
    $counts = [];
    if (is_string($raw) && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            flock($handle, LOCK_UN);
            fclose($handle);
            return;
        }
        $counts = $decoded;
    }

    $date = gmdate('Y-m-d');
    $key = $date . '|' . $source . '|' . $campaign;
    if (!array_key_exists($key, $counts) && count($counts) >= MAX_CAMPAIGN_BUCKETS) {
        flock($handle, LOCK_UN);
        fclose($handle);
        return;
    }
    $counts[$key] = isset($counts[$key]) && is_int($counts[$key])
        ? $counts[$key] + 1
        : 1;

    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($counts, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

$source = 'landing';
$campaign = campaign_token($_GET['campaign'] ?? null, 'organic_direct');

record_aggregate_click($source, $campaign);

$query = [];

if (preg_match('/^[0-9]+$/', APP_STORE_PROVIDER_TOKEN)) {
    $query['ct'] = $campaign;
    $query['mt'] = '8';
    $query['pt'] = APP_STORE_PROVIDER_TOKEN;
}

header('Cache-Control: no-store, max-age=0');
header('Referrer-Policy: no-referrer');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
$target = APP_STORE_URL;
if ($query !== []) {
    $target .= '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);
}
header('Location: ' . $target, true, 302);
exit;
