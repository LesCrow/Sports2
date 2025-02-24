-- CreateEnum
CREATE TYPE "SportType" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING', 'ROLLER', 'WORKOUT', 'CLIMBING', 'STRETCH', 'OTHER');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TRAINING', 'LONG_DISTANCE', 'COMPETITION', 'HOME_WORK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "birthdate" TIMESTAMP(3),
    "bio" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "sex" TEXT,
    "weight" DOUBLE PRECISION,
    "activities_count" INTEGER NOT NULL,
    "total_distance" INTEGER NOT NULL,
    "total_moving_time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "moving_time" INTEGER NOT NULL,
    "total_elevation_gain" DOUBLE PRECISION,
    "type" "Type" NOT NULL,
    "sport_type" "SportType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "average_speed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "elev_high" DOUBLE PRECISION,
    "elev_low" DOUBLE PRECISION,
    "description" TEXT,
    "userId" TEXT,
    "shoeId" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shoe" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Shoe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_shoeId_fkey" FOREIGN KEY ("shoeId") REFERENCES "Shoe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shoe" ADD CONSTRAINT "Shoe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
