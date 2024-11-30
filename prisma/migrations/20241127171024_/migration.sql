/*
  Warnings:

  - Added the required column `mkName` to the `Drink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mkName` to the `FoodType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Drink` ADD COLUMN `mkName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `FoodType` ADD COLUMN `mkName` VARCHAR(191) NOT NULL;
