<?php

use App\Kernel;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

require dirname(__DIR__).'/vendor/autoload.php';

$kernel = new Kernel($_SERVER['APP_ENV'] ?? 'prod', false);
$request = Request::createFromGlobals();
try {
    $response = $kernel->handle($request);
} catch (\Throwable $error) {
    error_log((string) $error);
    (new JsonResponse(['message' => 'Erreur de démarrage de Symfony.'], 500))->send();
    return;
}
$response->send();
$kernel->terminate($request, $response);
