CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "street" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "zipcode" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,

    CONSTRAINT "address_event_pkey" PRIMARY KEY ("id","address_id","event_id")
);

-- CreateTable
CREATE TABLE "batch" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ticket_price" DECIMAL(10,2) NOT NULL,
    "ticket_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "batch_effective_date" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "trading_name" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "company_type_id" UUID NOT NULL,
    "thumbnail_url" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,

    CONSTRAINT "company_addresses_pkey" PRIMARY KEY ("id","address_id","company_id")
);

-- CreateTable
CREATE TABLE "company_type" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "company_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_date" TIMESTAMP(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "company_id" UUID NOT NULL,
    "thumbnail_url" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" SERIAL NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "event_id" UUID NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "avatar_url" TEXT,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("id","user_id","address_id")
);

-- CreateTable
CREATE TABLE "user_tickets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "ticket_id" UUID NOT NULL,
    "batch_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_tickets_pkey" PRIMARY KEY ("id","user_id","ticket_id","batch_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_type_code_key" ON "company_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_code_key" ON "ticket"("code");

-- AddForeignKey
ALTER TABLE "address_event" ADD CONSTRAINT "fkaddress_ev976372" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address_event" ADD CONSTRAINT "fkaddress_ev329279" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "fkbatch581124" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "fkcompany646184" FOREIGN KEY ("company_type_id") REFERENCES "company_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_addresses" ADD CONSTRAINT "fkcompany_ad477761" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_addresses" ADD CONSTRAINT "fkcompany_ad925190" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "fkevent705878" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "fkticket947665" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fkuser994439" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "fkuser_addre968504" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "fkuser_addre865705" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "fkuser_ticke946989" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "fkuser_ticke416670" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_tickets" ADD CONSTRAINT "fkuser_ticke143587" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
