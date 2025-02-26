/*
  Warnings:

  - You are about to drop the column `average_cadence` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `calories` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `has_heartrate` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `max_speed` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `upload_id` on the `Activity` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Activity_external_id_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "average_cadence",
DROP COLUMN "calories",
DROP COLUMN "external_id",
DROP COLUMN "has_heartrate",
DROP COLUMN "max_speed",
DROP COLUMN "private",
DROP COLUMN "upload_id",
ALTER COLUMN "distance" DROP NOT NULL;
