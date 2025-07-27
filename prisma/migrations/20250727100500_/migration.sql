/*
  Warnings:

  - You are about to drop the column `firstName` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `note`;
