<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

$envFile = getenv('SYMFONY_DOTENV_PATH') ?: dirname(__DIR__).'/.env';
if (is_file($envFile)) {
    (new Dotenv())->bootEnv($envFile, 'prod');
}
