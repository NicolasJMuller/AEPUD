<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Schema\Table;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20261116000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Crée AE_PRODUCT et ajoute les deux produits initiaux.';
    }

    public function up(Schema $schema): void
    {
        $products = new Table('AE_PRODUCT');
        $products->addColumn('PR_id', Types::INTEGER, ['autoincrement' => true]);
        $products->addColumn('PR_Name', Types::STRING, ['length' => 120]);
        $products->addColumn('PR_Stock', Types::INTEGER, ['unsigned' => true]);
        $products->addColumn('PR_Price', Types::DECIMAL, ['precision' => 8, 'scale' => 2]);
        $products->setPrimaryKey(['PR_id']);

        foreach ($this->connection->getDatabasePlatform()->getCreateTableSQL($products) as $sql) {
            $this->addSql($sql);
        }

        $this->addSql(
            'INSERT INTO AE_PRODUCT (PR_Name, PR_Stock, PR_Price) VALUES (?, ?, ?), (?, ?, ?)',
            ['coca', 24, '0.90', 'redbull', 3, '1.20'],
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE AE_PRODUCT');
    }

    public function isTransactional(): bool
    {
        // MySQL and MariaDB implicitly commit CREATE TABLE and DROP TABLE.
        return false;
    }
}
