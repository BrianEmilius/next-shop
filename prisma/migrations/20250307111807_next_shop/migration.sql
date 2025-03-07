/*
  Warnings:

  - You are about to drop the `_tokenstousers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usersId` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_tokenstousers` DROP FOREIGN KEY `_tokensTousers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_tokenstousers` DROP FOREIGN KEY `_tokensTousers_B_fkey`;

-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `usersId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_tokenstousers`;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
