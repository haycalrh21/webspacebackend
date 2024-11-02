CREATE TABLE IF NOT EXISTS "tasks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tasks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"createdAt" timestamp (6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "createdAt" timestamp (6) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "createdAt" timestamp (6) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN IF EXISTS "imageUrls";