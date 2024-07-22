/*
  Warnings:

  - Made the column `single_category` on table `menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "single_category" SET NOT NULL;
