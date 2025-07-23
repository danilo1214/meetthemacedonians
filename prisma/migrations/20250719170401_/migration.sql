/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `familyName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `isSmoking` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `maximumPeople` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `neighbourhood` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - You are about to drop the `Drink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileDrink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileFoodType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileLangugage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservationPerson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lat` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFrom` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTo` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileDrink` DROP FOREIGN KEY `ProfileDrink_drinkId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileDrink` DROP FOREIGN KEY `ProfileDrink_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileFoodType` DROP FOREIGN KEY `ProfileFoodType_foodTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileFoodType` DROP FOREIGN KEY `ProfileFoodType_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileLangugage` DROP FOREIGN KEY `ProfileLangugage_languageId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileLangugage` DROP FOREIGN KEY `ProfileLangugage_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ReservationPerson` DROP FOREIGN KEY `ReservationPerson_reservationId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `dateOfBirth`,
    DROP COLUMN `description`,
    DROP COLUMN `familyName`,
    DROP COLUMN `isSmoking`,
    DROP COLUMN `maximumPeople`,
    DROP COLUMN `neighbourhood`,
    ADD COLUMN `lat` DOUBLE NOT NULL,
    ADD COLUMN `lng` DOUBLE NOT NULL,
    ADD COLUMN `pricePerHour` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `country`,
    DROP COLUMN `date`,
    ADD COLUMN `dateFrom` DATETIME(3) NOT NULL,
    ADD COLUMN `dateTo` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'ACCEPTED') NOT NULL;

-- DropTable
DROP TABLE `Drink`;

-- DropTable
DROP TABLE `FoodType`;

-- DropTable
DROP TABLE `Language`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `ProfileDrink`;

-- DropTable
DROP TABLE `ProfileFoodType`;

-- DropTable
DROP TABLE `ProfileLangugage`;

-- DropTable
DROP TABLE `ReservationPerson`;
