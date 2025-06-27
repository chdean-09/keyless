/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_registeredToId_fkey";

-- DropTable
DROP TABLE "Device";

-- CreateTable
CREATE TABLE "device" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "registeredToId" TEXT NOT NULL,
    "lastCommand" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_registeredToId_fkey" FOREIGN KEY ("registeredToId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
