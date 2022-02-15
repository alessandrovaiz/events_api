/*
  Warnings:

  - You are about to drop the column `is_active` on the `ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `user_tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "user_tickets" ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_tickets_code_key" ON "user_tickets"("code");
