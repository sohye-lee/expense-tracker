-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_userId_fkey";

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
