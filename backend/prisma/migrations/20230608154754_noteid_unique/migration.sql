/*
  Warnings:

  - A unique constraint covering the columns `[noteId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_noteId_key" ON "Note"("noteId");
