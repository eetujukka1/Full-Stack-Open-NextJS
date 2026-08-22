CREATE TABLE "readingListItems" (
	"id" serial PRIMARY KEY NOT NULL,
	"reading_list_id" integer NOT NULL,
	"blog_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "readingLists" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "readingLists_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "readingListItems" ADD CONSTRAINT "readingListItems_reading_list_id_readingLists_id_fk" FOREIGN KEY ("reading_list_id") REFERENCES "public"."readingLists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readingListItems" ADD CONSTRAINT "readingListItems_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readingLists" ADD CONSTRAINT "readingLists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;