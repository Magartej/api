-- CreateTable
CREATE TABLE `House` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `provience` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `locallevel` VARCHAR(191) NOT NULL,
    `lcoalarea` VARCHAR(191) NOT NULL,
    `locationdescription` LONGTEXT NOT NULL,
    `laundry` BOOLEAN NOT NULL DEFAULT false,
    `freeparking` BOOLEAN NOT NULL DEFAULT false,
    `freewifi` BOOLEAN NOT NULL DEFAULT false,
    `watersupply` BOOLEAN NOT NULL DEFAULT false,
    `electricity` BOOLEAN NOT NULL DEFAULT false,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    FULLTEXT INDEX `House_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `bedCount` INTEGER NOT NULL DEFAULT 0,
    `singleBed` INTEGER NOT NULL DEFAULT 0,
    `doubleBed` INTEGER NOT NULL DEFAULT 0,
    `image` VARCHAR(191) NOT NULL,
    `breakFastPrice` INTEGER NOT NULL,
    `roomPrice` INTEGER NOT NULL,
    `roomservice` BOOLEAN NOT NULL DEFAULT false,
    `TV` BOOLEAN NOT NULL DEFAULT false,
    `Balcony` BOOLEAN NOT NULL DEFAULT false,
    `freewifi` BOOLEAN NOT NULL DEFAULT false,
    `aircondition` BOOLEAN NOT NULL DEFAULT false,
    `houseId` VARCHAR(191) NOT NULL,

    INDEX `Room_houseId_idx`(`houseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NOT NULL,
    `houseOnerID` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `breakfastIncluded` BOOLEAN NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `paymentStatus` BOOLEAN NOT NULL DEFAULT false,
    `paymentIntentId` VARCHAR(191) NOT NULL,
    `bookedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Booking_paymentIntentId_key`(`paymentIntentId`),
    INDEX `Booking_houseId_idx`(`houseId`),
    INDEX `Booking_roomId_idx`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `House`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
