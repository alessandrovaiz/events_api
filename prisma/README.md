# Setup da base
>Criar uma base de dados e configurar no .env a database URL

>Rodar o script sql :

CREATE TABLE address (id uuid DEFAULT gen_random_uuid() NOT NULL, street text, number text, complement text, zipcode text, district text, city text, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp, PRIMARY KEY (id));
CREATE TABLE address_event (id uuid DEFAULT gen_random_uuid() NOT NULL, address_id uuid NOT NULL, event_id uuid NOT NULL, PRIMARY KEY (id, address_id, event_id));
CREATE TABLE batch (id uuid DEFAULT gen_random_uuid() NOT NULL, ticket_price numeric(10, 2) NOT NULL, ticket_id uuid NOT NULL, amount int4 NOT NULL, is_active bool DEFAULT 'true' NOT NULL, batch_effective_date timestamp NOT NULL, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp, PRIMARY KEY (id));
CREATE TABLE company (id uuid DEFAULT gen_random_uuid() NOT NULL, name text NOT NULL, trading_name text, phone text NOT NULL, email text NOT NULL, cnpj text NOT NULL, is_active bool DEFAULT 'true' NOT NULL, company_type_id uuid NOT NULL, thumbnail_url text, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp, PRIMARY KEY (id));
CREATE TABLE company_addresses (id uuid DEFAULT gen_random_uuid() NOT NULL, address_id uuid NOT NULL, company_id uuid NOT NULL, PRIMARY KEY (id, address_id, company_id));
CREATE TABLE company_type (id uuid NOT NULL, code int4 NOT NULL, name text NOT NULL, PRIMARY KEY (id));
CREATE TABLE event (id uuid DEFAULT gen_random_uuid() NOT NULL, name text NOT NULL, description text NOT NULL, event_date timestamp NOT NULL, is_active bool DEFAULT 'true' NOT NULL, company_id uuid NOT NULL, thumbnail_url text, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp, PRIMARY KEY (id));
CREATE TABLE role (id uuid DEFAULT gen_random_uuid() NOT NULL, code int4 NOT NULL, name text NOT NULL, description text, PRIMARY KEY (id));
CREATE TABLE ticket (id uuid DEFAULT gen_random_uuid() NOT NULL, code int4 NOT NULL, expiration_date timestamp NOT NULL, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp, event_id uuid NOT NULL, PRIMARY KEY (id));
CREATE TABLE "user" (id uuid DEFAULT gen_random_uuid() NOT NULL, first_name text NOT NULL, last_name text NOT NULL, email text NOT NULL, password text NOT NULL, is_active bool DEFAULT 'true' NOT NULL, avatar_url text, role_id uuid NOT NULL, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp, PRIMARY KEY (id));
CREATE TABLE user_addresses (id uuid DEFAULT gen_random_uuid() NOT NULL, user_id uuid NOT NULL, address_id uuid NOT NULL, PRIMARY KEY (id, user_id, address_id));
CREATE TABLE user_tickets (id uuid DEFAULT gen_random_uuid() NOT NULL, user_id uuid NOT NULL, ticket_id uuid NOT NULL, amount int4 NOT NULL, purchase_date timestamp NOT NULL, payment_method text NOT NULL, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (id, user_id, ticket_id));
ALTER TABLE company ADD CONSTRAINT FKcompany646184 FOREIGN KEY (company_type_id) REFERENCES company_type (id);
ALTER TABLE batch ADD CONSTRAINT FKbatch581124 FOREIGN KEY (ticket_id) REFERENCES ticket (id);
ALTER TABLE event ADD CONSTRAINT FKevent705878 FOREIGN KEY (company_id) REFERENCES company (id);
ALTER TABLE ticket ADD CONSTRAINT FKticket947665 FOREIGN KEY (event_id) REFERENCES event (id);
ALTER TABLE address_event ADD CONSTRAINT FKaddress_ev976372 FOREIGN KEY (address_id) REFERENCES address (id);
ALTER TABLE address_event ADD CONSTRAINT FKaddress_ev329279 FOREIGN KEY (event_id) REFERENCES event (id);
ALTER TABLE company_addresses ADD CONSTRAINT FKcompany_ad477761 FOREIGN KEY (address_id) REFERENCES address (id);
ALTER TABLE company_addresses ADD CONSTRAINT FKcompany_ad925190 FOREIGN KEY (company_id) REFERENCES company (id);
ALTER TABLE user_addresses ADD CONSTRAINT FKuser_addre865705 FOREIGN KEY (user_id) REFERENCES "user" (id);
ALTER TABLE user_addresses ADD CONSTRAINT FKuser_addre968504 FOREIGN KEY (address_id) REFERENCES address (id);
ALTER TABLE user_tickets ADD CONSTRAINT FKuser_ticke143587 FOREIGN KEY (user_id) REFERENCES "user" (id);
ALTER TABLE user_tickets ADD CONSTRAINT FKuser_ticke416670 FOREIGN KEY (ticket_id) REFERENCES ticket (id);
ALTER TABLE "user" ADD CONSTRAINT FKuser994439 FOREIGN KEY (role_id) REFERENCES role (id);


> npx prisma db pull

> npx prisma db generate

> npx prisma db seed
