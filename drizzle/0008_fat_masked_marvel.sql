CREATE TABLE IF NOT EXISTS "discuss" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "discuss_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"createdAt" timestamp (6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "imageUrls" json NOT NULL;