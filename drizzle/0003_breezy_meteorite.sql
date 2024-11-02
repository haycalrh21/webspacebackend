CREATE TABLE IF NOT EXISTS "blogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"imageUrls" json NOT NULL,
	"description" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL
);
