-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('NETWORKING', 'TUTORIALS', 'RANDOM', 'TECH_NEWS', 'PERSONAL');

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "category" "BlogCategory" NOT NULL DEFAULT 'RANDOM';
