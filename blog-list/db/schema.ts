import { boolean, pgTable, serial, text, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    author: text("author").notNull(),
    url: text("url").notNull(),
    likes: integer("likes").notNull(),
    userId: integer("user_id").notNull().references(() => users.id),
})

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull().default(""),
    token: text("token"),
})

export const readingLists = pgTable("readingLists", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().unique().references(() => users.id),
})

export const readingListItems = pgTable("readingListItems", {
    id: serial("id").primaryKey(),
    readingListId: integer("reading_list_id").notNull().references(() => readingLists.id),
    blogId: integer("blog_id").notNull().references(() => blogs.id),
    read: boolean("read").notNull().default(false),
})

export const usersRelations = relations(users, ({ one, many }) => ({
    blogs: many(blogs),
    readingList: one(readingLists),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
    user: one(users, {
        fields: [blogs.userId],
        references: [users.id],
    }),
    readingListItems: many(readingListItems),
}))

export const readingListsRelations = relations(readingLists, ({ one, many }) => ({
    user: one(users, {
        fields: [readingLists.userId],
        references: [users.id],
    }),
    items: many(readingListItems),
}))

export const readingListItemsRelations = relations(readingListItems, ({ one }) => ({
    readingList: one(readingLists, {
        fields: [readingListItems.readingListId],
        references: [readingLists.id],
    }),
    blog: one(blogs, {
        fields: [readingListItems.blogId],
        references: [blogs.id],
    }),
}))
