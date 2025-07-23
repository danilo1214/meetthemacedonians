/*
  Warnings:

  - Made the column `address` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Profile` MODIFY `address` VARCHAR(191) NOT NULL;
