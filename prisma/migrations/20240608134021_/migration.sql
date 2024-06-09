-- CreateEnum
CREATE TYPE "MenuType" AS ENUM ('CATALOG', 'MENU', 'ACCESS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLANING', 'IN_PRODUCTION', 'COMPLETED');

-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('MEMBER', 'ADMIN');

-- CreateTable
CREATE TABLE "sys_production_plan" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "sys_production_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_customer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "sys_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_employee" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "pieces_number" DOUBLE PRECISION,
    "left_at" TIMESTAMP(3),

    CONSTRAINT "sys_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_supplier" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "sys_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_material" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "remark" TEXT,
    "unit" TEXT,
    "stock" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "sys_material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_menu" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "parent_id" INTEGER,
    "name" TEXT NOT NULL,
    "path" TEXT,
    "permission" TEXT,
    "type" "MenuType" NOT NULL,
    "icon" TEXT,
    "sort" INTEGER DEFAULT 0,
    "component" TEXT,
    "show" INTEGER NOT NULL DEFAULT 1,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "sys_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_role" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "value" TEXT NOT NULL,
    "remark" TEXT,
    "status" INTEGER DEFAULT 1,
    "default" BOOLEAN DEFAULT false,

    CONSTRAINT "sys_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_dept" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "sort" INTEGER DEFAULT 0,

    CONSTRAINT "sys_dept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_login_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ip" TEXT,
    "address" TEXT,
    "provider" TEXT,
    "ua" VARCHAR(500),
    "user_id" INTEGER,

    CONSTRAINT "sys_login_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tool_storage" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT,
    "ext_name" TEXT,
    "path" TEXT NOT NULL,
    "type" TEXT,
    "size" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "tool_storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" VARCHAR(32) NOT NULL,
    "nickname" TEXT,
    "avatar" TEXT,
    "phone" TEXT,
    "remark" TEXT,
    "status" INTEGER DEFAULT 1,
    "dept_id" INTEGER,

    CONSTRAINT "sys_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_refresh_tokens" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" VARCHAR(500) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "access_token_id" TEXT NOT NULL,

    CONSTRAINT "user_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_access_tokens" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" VARCHAR(500) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_sys_supplier_material" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_sys_menu_role" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_sys_user_role" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_production_plan_code_key" ON "sys_production_plan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys_customer_code_key" ON "sys_customer"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys_supplier_code_key" ON "sys_supplier"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys_material_code_key" ON "sys_material"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys_role_name_key" ON "sys_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sys_role_value_key" ON "sys_role"("value");

-- CreateIndex
CREATE INDEX "sys_login_log_user_id_idx" ON "sys_login_log"("user_id");

-- CreateIndex
CREATE INDEX "tool_storage_user_id_idx" ON "tool_storage"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_username_key" ON "sys_user"("username");

-- CreateIndex
CREATE INDEX "sys_user_dept_id_idx" ON "sys_user"("dept_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_refresh_tokens_access_token_id_key" ON "user_refresh_tokens"("access_token_id");

-- CreateIndex
CREATE INDEX "user_access_tokens_user_id_idx" ON "user_access_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_sys_supplier_material_AB_unique" ON "_sys_supplier_material"("A", "B");

-- CreateIndex
CREATE INDEX "_sys_supplier_material_B_index" ON "_sys_supplier_material"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_sys_menu_role_AB_unique" ON "_sys_menu_role"("A", "B");

-- CreateIndex
CREATE INDEX "_sys_menu_role_B_index" ON "_sys_menu_role"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_sys_user_role_AB_unique" ON "_sys_user_role"("A", "B");

-- CreateIndex
CREATE INDEX "_sys_user_role_B_index" ON "_sys_user_role"("B");
