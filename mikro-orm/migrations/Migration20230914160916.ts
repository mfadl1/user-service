import { Migration } from '@mikro-orm/migrations';

export class Migration20230914160916 extends Migration {

  async up(): Promise<void> {
    this.addSql('create schema if not exists "authenticator";');

    this.addSql('create table "authenticator"."users" ("id" serial primary key, "name" varchar(255) not null, "phone_number" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null, "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP, "updated_at" timestamp with time zone not null default CURRENT_TIMESTAMP);');
    this.addSql('alter table "authenticator"."users" add constraint "users_phone_number_unique" unique ("phone_number");');
    this.addSql('alter table "authenticator"."users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('create schema if not exists "inventory";');

    this.addSql('create table "inventory"."mikro_orm_migrations" ("id" serial primary key, "name" varchar null default null, "executed_at" timestamptz null default CURRENT_TIMESTAMP);');

    this.addSql('create table "inventory"."product_details" ("id" serial primary key, "product_id" int4 not null default null, "description" varchar null default null, "buy_price" int4 not null default 0, "sell_price" int4 not null default 0, "url_image" varchar null default null, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz not null default CURRENT_TIMESTAMP, "stock" int4 not null default 0, "rating" float8 null default null);');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_product_id_unique" unique ("product_id");');

    this.addSql('create table "inventory"."products" ("id" serial primary key, "name" varchar not null default null, "sku" varchar not null default null, "category" varchar null default null, "is_active" bool not null default null, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz not null default CURRENT_TIMESTAMP);');
    this.addSql('alter table "inventory"."products" add constraint "products_sku_unique" unique ("sku");');

    this.addSql('alter table "inventory"."product_details" add constraint "product_details_product_id_foreign" foreign key ("product_id") references "inventory"."products" ("id") on update cascade on delete cascade;');
  }

}
