<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use Symfony\Component\Yaml\Yaml;

use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

final class Kernel extends BaseKernel
{
    use MicroKernelTrait;

    public function getCacheDir(): string
    {
        return getenv('AEPUD_CACHE_DIR') ?: parent::getCacheDir();
    }

    private function configureContainer(ContainerConfigurator $container): void
    {
        $config = $this->getProjectDir().'/config';
        $users = json_decode(file_get_contents($config.'/demo-users.json'), true, flags: JSON_THROW_ON_ERROR);
        $security = Yaml::parse(file_get_contents($config.'/packages/security.yaml'))['security'];
        $security['providers']['json_users']['memory']['users'] = $users;

        $container->extension('framework', ['handle_all_throwables' => true]);
        $container->extension('doctrine', [
            'dbal' => ['url' => '%env(DATABASE_URL)%'],
            'orm' => [
                'mappings' => [
                    'App' => [
                        'type' => 'attribute',
                        'is_bundle' => false,
                        'dir' => '%kernel.project_dir%/src/Entity',
                        'prefix' => 'App\\Entity',
                    ],
                ],
            ],
        ]);
        $container->extension('doctrine_migrations', [
            'migrations_paths' => ['DoctrineMigrations' => '%kernel.project_dir%/migrations'],
        ]);
        $container->extension('security', $security);
        $container->extension('lexik_jwt_authentication', [
            'secret_key' => getenv('AEPUD_JWT_PRIVATE_KEY') ?: $config.'/jwt/private.pem',
            'public_key' => getenv('AEPUD_JWT_PUBLIC_KEY') ?: $config.'/jwt/public.pem',
            'token_ttl' => 3600,
        ]);
        $container->services()->set(SessionController::class)->public()->args([service('security.helper')]);
        $container->services()->set(ProductController::class)->public()->args([service('doctrine.orm.entity_manager')]);
    }

    private function configureRoutes(RoutingConfigurator $routes): void
    {
        $routes->add('api_login_check', '/api/login_check')->methods(['POST']);
        foreach (['me', 'user', 'admin'] as $route) {
            $routes->add('api_'.$route, '/api/'.$route)->methods(['GET'])->controller(SessionController::class);
        }
        $routes->add('api_products_list', '/api/products')->methods(['GET'])->controller(ProductController::class.'::list');
        $routes->add('api_products_create', '/api/products')->methods(['POST'])->controller(ProductController::class.'::create');
        foreach (['show' => 'GET', 'update' => 'PUT', 'delete' => 'DELETE'] as $action => $method) {
            $routes->add('api_products_'.$action, '/api/products/{id}')
                ->requirements(['id' => '[1-9][0-9]{0,9}'])
                ->methods([$method])
                ->controller(ProductController::class.'::'.$action);
        }
    }
}
