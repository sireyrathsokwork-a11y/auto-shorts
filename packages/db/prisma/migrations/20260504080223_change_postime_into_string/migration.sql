/*
  Warnings:

  - Made the column `postingTime` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "postingTime" SET NOT NULL,
ALTER COLUMN "postingTime" DROP DEFAULT,
ALTER COLUMN "postingTime" SET DATA TYPE TEXT;
