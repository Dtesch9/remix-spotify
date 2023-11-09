CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"token_type" varchar(20),
	"expires_in" timestamp,
	"scope" text
);
