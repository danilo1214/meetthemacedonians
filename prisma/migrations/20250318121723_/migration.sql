-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ReservationPerson` DROP FOREIGN KEY `ReservationPerson_reservationId_fkey`;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationPerson` ADD CONSTRAINT `ReservationPerson_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
