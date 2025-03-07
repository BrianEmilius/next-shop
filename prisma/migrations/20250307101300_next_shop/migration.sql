/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `credential_identifier_UNIQUE` ON `credentials`(`identifier`);
