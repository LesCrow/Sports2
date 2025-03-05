/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `providerAccountId` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "providerAccountId",
ADD COLUMN     "providerAccountId" INTEGER NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("provider", "providerAccountId");
