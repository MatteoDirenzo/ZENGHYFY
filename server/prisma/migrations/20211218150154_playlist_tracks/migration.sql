-- CreateTable
CREATE TABLE "Tracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "features" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlaylistTracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "features" TEXT NOT NULL
);
