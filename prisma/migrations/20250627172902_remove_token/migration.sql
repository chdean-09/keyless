/*
  Warnings:

  - You are about to drop the `pairing_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "device" DROP CONSTRAINT "device_registeredToId_fkey";

-- DropForeignKey
ALTER TABLE "pairing_token" DROP CONSTRAINT "pairing_token_createdById_fkey";

-- AlterTable
ALTER TABLE "device" ALTER COLUMN "registeredToId" DROP NOT NULL;

-- DropTable
DROP TABLE "pairing_token";

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_registeredToId_fkey" FOREIGN KEY ("registeredToId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
