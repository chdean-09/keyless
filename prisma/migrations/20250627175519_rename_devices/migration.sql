/*
  Warnings:

  - You are about to drop the `device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "device" DROP CONSTRAINT "device_registeredToId_fkey";

-- DropTable
DROP TABLE "device";

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "registeredToId" TEXT,
    "lastCommand" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_registeredToId_fkey" FOREIGN KEY ("registeredToId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
