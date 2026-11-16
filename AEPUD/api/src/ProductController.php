<?php

declare(strict_types=1);

namespace App;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

final class ProductController
{
    public function __construct(private readonly EntityManagerInterface $entityManager)
    {
    }

    public function list(): JsonResponse
    {
        $products = $this->entityManager->getRepository(Product::class)->findBy([], ['id' => 'ASC']);
        return new JsonResponse(array_map(static fn (Product $product) => $product->toArray(), $products));
    }

    public function show(int $id): JsonResponse
    {
        $product = $this->entityManager->find(Product::class, $id);
        return $product ? new JsonResponse($product->toArray()) : $this->notFound();
    }

    public function create(Request $request): JsonResponse
    {
        $data = $this->readProduct($request);
        if ($data instanceof JsonResponse) {
            return $data;
        }

        $product = new Product(...$data);
        $this->entityManager->persist($product);
        $this->entityManager->flush();

        $result = $product->toArray();
        return new JsonResponse($result, 201, ['Location' => '/api/products/'.$result['id']]);
    }

    public function update(int $id, Request $request): JsonResponse
    {
        $product = $this->entityManager->find(Product::class, $id);
        if (!$product) {
            return $this->notFound();
        }
        $data = $this->readProduct($request);
        if ($data instanceof JsonResponse) {
            return $data;
        }

        $product->update(...$data);
        $this->entityManager->flush();
        return new JsonResponse($product->toArray());
    }

    public function delete(int $id): Response
    {
        $product = $this->entityManager->find(Product::class, $id);
        if (!$product) {
            return $this->notFound();
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();
        return new Response(status: 204);
    }

    private function notFound(): JsonResponse
    {
        return new JsonResponse(['message' => 'Produit introuvable.'], 404);
    }

    private function readProduct(Request $request): array|JsonResponse
    {
        try {
            $data = $request->toArray();
        } catch (\Symfony\Component\HttpFoundation\Exception\JsonException) {
            return new JsonResponse(['message' => 'Corps JSON invalide.'], 400);
        }

        $name = is_string($data['name'] ?? null) ? trim($data['name']) : '';
        $stock = $data['stock'] ?? null;
        $price = $data['price'] ?? null;
        if ($name === '' || mb_strlen($name) > 120
            || !is_int($stock) || $stock < 0 || $stock > 4294967295
            || !is_string($price) || !preg_match('/\A(?:0|[1-9][0-9]{0,5})\.[0-9]{2}\z/', $price)) {
            return new JsonResponse(['message' => 'Renseigne un nom, un stock entier positif ou nul et un prix au format « 0.90 ».'], 422);
        }

        return [$name, $stock, $price];
    }
}
