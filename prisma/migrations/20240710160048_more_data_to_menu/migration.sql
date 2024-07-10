/*
  Warnings:

  - You are about to drop the column `category_id` on the `items` table. All the data in the column will be lost.
  - Made the column `subcategory_id` on table `items` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `menus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "category_id",
ALTER COLUMN "subcategory_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
