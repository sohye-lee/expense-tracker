/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "description",
DROP COLUMN "order";
