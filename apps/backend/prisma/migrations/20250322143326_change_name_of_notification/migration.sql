/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Notification";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserNotification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "owner" TEXT NOT NULL,
    CONSTRAINT "UserNotification_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
