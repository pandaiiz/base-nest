/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `user_access_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `user_refresh_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "sys_dict_type" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER DEFAULT 0,
    "remark" TEXT,
    "sort" INTEGER DEFAULT 0,

    CONSTRAINT "sys_dict_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_dict_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" INTEGER DEFAULT 0,
    "remark" TEXT,
    "sort" INTEGER DEFAULT 0,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "sys_dict_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_dict_type_name_key" ON "sys_dict_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys_dict_type_code_key" ON "sys_dict_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_access_tokens_value_key" ON "user_access_tokens"("value");

-- CreateIndex
CREATE UNIQUE INDEX "user_refresh_tokens_value_key" ON "user_refresh_tokens"("value");
