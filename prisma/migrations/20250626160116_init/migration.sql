-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "registeredToId" TEXT NOT NULL,
    "lastCommand" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_registeredToId_fkey" FOREIGN KEY ("registeredToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
