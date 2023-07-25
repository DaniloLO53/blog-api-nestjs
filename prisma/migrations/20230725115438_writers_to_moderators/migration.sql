/*
  Warnings:

  - You are about to drop the column `writer_id` on the `article_requests` table. All the data in the column will be lost.
  - You are about to drop the `writers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `article_requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "article_requests" DROP CONSTRAINT "article_requests_writer_id_fkey";

-- DropForeignKey
ALTER TABLE "writers" DROP CONSTRAINT "writers_article_id_fkey";

-- DropForeignKey
ALTER TABLE "writers" DROP CONSTRAINT "writers_user_id_fkey";

-- AlterTable
ALTER TABLE "article_requests" DROP COLUMN "writer_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "writers";

-- CreateTable
CREATE TABLE "moderators" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT DEFAULT 'No content',
    "article_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moderators_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "article_requests" ADD CONSTRAINT "article_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
