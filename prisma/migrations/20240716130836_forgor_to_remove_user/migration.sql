/*
  Warnings:

  - You are about to drop the column `userId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "userId";

-- DropTable
DROP TABLE "users";
