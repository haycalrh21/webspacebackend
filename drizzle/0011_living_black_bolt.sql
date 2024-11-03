ALTER TABLE "discuss" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "discuss" ALTER COLUMN "created_at" SET DATA TYPE timestamp;