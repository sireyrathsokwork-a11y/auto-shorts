-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "postingTime" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "videoUrl" TEXT;
