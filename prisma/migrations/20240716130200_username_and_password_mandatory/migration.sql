/*
  Warnings:

  - Made the column `password` on table `menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
