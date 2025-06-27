-- CreateTable
CREATE TABLE "pairing_token" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pairing_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pairing_token" ADD CONSTRAINT "pairing_token_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
