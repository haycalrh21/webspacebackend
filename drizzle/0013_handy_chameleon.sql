ALTER TABLE "bots" ALTER COLUMN "chat_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "bots" ALTER COLUMN "message_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "bots" ADD COLUMN "text" varchar(255) NOT NULL;