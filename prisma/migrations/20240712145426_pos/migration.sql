/*
  Warnings:

  - A unique constraint covering the columns `[pos]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pos]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pos]` on the table `subcategories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "pos" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "pos" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "subcategories" ADD COLUMN     "pos" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_pos_key" ON "categories"("pos");

-- CreateIndex
CREATE UNIQUE INDEX "items_pos_key" ON "items"("pos");

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_pos_key" ON "subcategories"("pos");
