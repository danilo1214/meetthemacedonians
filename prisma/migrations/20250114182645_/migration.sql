-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_createdById_fkey`;

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

-- AddForeignKey
ALTER TABLE `ProfileFoodType` ADD CONSTRAINT `ProfileFoodType_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileFoodType` ADD CONSTRAINT `ProfileFoodType_foodTypeId_fkey` FOREIGN KEY (`foodTypeId`) REFERENCES `FoodType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileDrink` ADD CONSTRAINT `ProfileDrink_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileDrink` ADD CONSTRAINT `ProfileDrink_drinkId_fkey` FOREIGN KEY (`drinkId`) REFERENCES `Drink`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLangugage` ADD CONSTRAINT `ProfileLangugage_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLangugage` ADD CONSTRAINT `ProfileLangugage_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
