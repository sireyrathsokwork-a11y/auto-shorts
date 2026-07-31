/*
  Warnings:

  - You are about to drop the column `musicTrack` on the `Project` table. All the data in the column will be lost.
  - Added the required column `trackId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "musicTrack",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MusicTrack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "attribution" TEXT NOT NULL,

    CONSTRAINT "MusicTrack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "MusicTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
