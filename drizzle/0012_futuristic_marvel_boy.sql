CREATE TABLE IF NOT EXISTS "bots" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bots_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"chat_id" integer NOT NULL,
	"username" varchar(255) NOT NULL,
	"message_id" integer NOT NULL,
	"createdAt" timestamp (6) DEFAULT now() NOT NULL
);
