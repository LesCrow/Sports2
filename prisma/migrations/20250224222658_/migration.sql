-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activities_count" DROP NOT NULL,
ALTER COLUMN "total_distance" DROP NOT NULL,
ALTER COLUMN "total_moving_time" DROP NOT NULL;
