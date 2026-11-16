<?php

namespace App;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

final class SessionController
{
    public function __construct(private readonly Security $security)
    {
    }

    public function __invoke(): JsonResponse
    {
        $user = $this->security->getUser();

        return new JsonResponse(
            ['username' => $user->getUserIdentifier(), 'roles' => $user->getRoles()],
            headers: ['Cache-Control' => 'no-store'],
        );
    }
}
