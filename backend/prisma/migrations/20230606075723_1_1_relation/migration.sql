/*
  Warnings:

  - Added the required column `Address` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "Address" VARCHAR(255) NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;
