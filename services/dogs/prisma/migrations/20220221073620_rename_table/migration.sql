/*
  Warnings:

  - You are about to drop the `Dog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Dog";

-- CreateTable
CREATE TABLE "dog" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "dog_pkey" PRIMARY KEY ("id")
);
