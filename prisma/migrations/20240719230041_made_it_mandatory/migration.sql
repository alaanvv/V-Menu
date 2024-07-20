/*
  Warnings:

  - Made the column `path` on table `menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "path" SET NOT NULL;
