/*
  Warnings:

  - You are about to drop the column `code` on the `ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ticket_code_key";

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "code";
