/*
  Warnings:

  - A unique constraint covering the columns `[stravaId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stravaId" TEXT,
ADD COLUMN     "stravaToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stravaId_key" ON "User"("stravaId");
