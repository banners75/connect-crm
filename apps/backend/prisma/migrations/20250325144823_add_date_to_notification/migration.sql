-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserNotification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "owner" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserNotification_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserNotification" ("id", "message", "owner", "read") SELECT "id", "message", "owner", "read" FROM "UserNotification";
DROP TABLE "UserNotification";
ALTER TABLE "new_UserNotification" RENAME TO "UserNotification";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
