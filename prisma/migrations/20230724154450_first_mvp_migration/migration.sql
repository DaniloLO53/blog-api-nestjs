/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_author_id_fkey";

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT DEFAULT 'No content',
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_requests" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT DEFAULT 'No content',
    "article_id" INTEGER NOT NULL,
    "writer_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writers" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT DEFAULT 'No content',
    "article_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "isModerator" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "writers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_requests" ADD CONSTRAINT "article_requests_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_requests" ADD CONSTRAINT "article_requests_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "writers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writers" ADD CONSTRAINT "writers_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writers" ADD CONSTRAINT "writers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
