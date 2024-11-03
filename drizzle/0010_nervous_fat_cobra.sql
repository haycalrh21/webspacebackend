CREATE TABLE IF NOT EXISTS "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"comment" varchar(255) NOT NULL,
	"createdAt" timestamp (6) DEFAULT now() NOT NULL
);