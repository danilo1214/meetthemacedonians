/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_profileId_fkey`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `address` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Address`;
