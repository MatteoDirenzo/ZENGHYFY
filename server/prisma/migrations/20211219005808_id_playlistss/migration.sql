/*
  Warnings:

  - Added the required column `idPlaylist` to the `PlaylistTracks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaylistTracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPlaylist" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "features" TEXT NOT NULL
);
INSERT INTO "new_PlaylistTracks" ("createdAt", "features", "id") SELECT "createdAt", "features", "id" FROM "PlaylistTracks";
DROP TABLE "PlaylistTracks";
ALTER TABLE "new_PlaylistTracks" RENAME TO "PlaylistTracks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
