-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
