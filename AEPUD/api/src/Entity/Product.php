<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'AE_PRODUCT')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column(name: 'PR_id', type: Types::INTEGER)]
    private ?int $id = null;

    public function __construct(
        #[ORM\Column(name: 'PR_Name', length: 120)]
        private string $name,
        #[ORM\Column(name: 'PR_Stock', options: ['unsigned' => true])]
        private int $stock,
        #[ORM\Column(name: 'PR_Price', type: Types::DECIMAL, precision: 8, scale: 2)]
        private string $price,
    ) {
    }

    public function update(string $name, int $stock, string $price): void
    {
        $this->name = $name;
        $this->stock = $stock;
        $this->price = $price;
    }

    public function toArray(): array
    {
        [$euros, $cents] = array_pad(explode('.', $this->price, 2), 2, '');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'stock' => $this->stock,
            'price' => $euros.'.'.str_pad($cents, 2, '0'),
        ];
    }
}
