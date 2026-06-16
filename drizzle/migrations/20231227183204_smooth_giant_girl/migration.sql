CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"href" text NOT NULL,
	"spotify_id" text NOT NULL,
	"type" text NOT NULL,
	"uri" text NOT NULL,
	"followers" integer NOT NULL,
	"country" text NOT NULL,
	"product" text NOT NULL,
	"email" text NOT NULL,
	"avatar_url" text NOT NULL,
	"external_url" text NOT NULL,
	CONSTRAINT "users_spotify_id_unique" UNIQUE("spotify_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_credentials" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"access_token" text NOT NULL,
	"refresh_token" text NOT NULL,
	"token_type" varchar(20) NOT NULL,
	"expires_in" bigint NOT NULL,
	"scope" text NOT NULL,
	"user_id" varchar(255) NOT NULL,
	CONSTRAINT "users_credentials_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_friends" (
	"user_id" varchar(255) NOT NULL,
	"friend_id" varchar(255) NOT NULL,
	CONSTRAINT users_to_friends_user_id_friend_id PRIMARY KEY("user_id","friend_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_credentials" ADD CONSTRAINT "users_credentials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_friends" ADD CONSTRAINT "users_to_friends_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_friends" ADD CONSTRAINT "users_to_friends_friend_id_users_id_fk" FOREIGN KEY ("friend_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
