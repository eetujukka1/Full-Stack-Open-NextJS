import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingListItems, readingLists } from "@/db/schema"
import {getCurrentUser} from "@/app/services/session";

export const getBlogs = async () => {
    return db.query.blogs.findMany()
}

const getOrCreateReadingList = async (userId: number) => {
    const [createdReadingList] = await db
        .insert(readingLists)
        .values({ userId })
        .onConflictDoNothing({ target: readingLists.userId })
        .returning({ id: readingLists.id })

    const readingList = createdReadingList ?? await db.query.readingLists.findFirst({
        where: eq(readingLists.userId, userId),
        columns: { id: true },
    })

    if (!readingList) {
        throw new Error("Failed to find reading list")
    }

    return readingList
}

const addBlogToUserReadingList = async (userId: number, blogId: number) => {
    const readingList = await getOrCreateReadingList(userId)

    const existingItem = await db.query.readingListItems.findFirst({
        where: and(
            eq(readingListItems.readingListId, readingList.id),
            eq(readingListItems.blogId, blogId)
        ),
        columns: { id: true },
    })

    if (existingItem) {
        return
    }

    await db
        .insert(readingListItems)
        .values({ readingListId: readingList.id, blogId })
}

export const addBlog = async (
    title: string,
    author: string,
    url: string,
    likes: number,
) => {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Not logged in")
    }
    const [blog] = await db
        .insert(blogs)
        .values({ title, author, url, likes, userId: user.id })
        .returning({ id: blogs.id })

    if (!blog) {
        throw new Error("Failed to create blog")
    }

    await addBlogToUserReadingList(user.id, blog.id)
}

export const addBlogToReadingList = async (blogId: number) => {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Not logged in")
    }

    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, blogId),
        columns: { id: true },
    })

    if (!blog) {
        throw new Error("Blog not found")
    }

    await addBlogToUserReadingList(user.id, blog.id)
}

export const markReadingListItemAsRead = async (readingListItemId: number) => {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Not logged in")
    }

    const readingList = await db.query.readingLists.findFirst({
        where: eq(readingLists.userId, user.id),
        columns: { id: true },
    })

    if (!readingList) {
        throw new Error("Reading list not found")
    }

    await db
        .update(readingListItems)
        .set({ read: true })
        .where(
            and(
                eq(readingListItems.id, readingListItemId),
                eq(readingListItems.readingListId, readingList.id)
            )
        )
}

export const getBlogById = (id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
        with: { user: true }
    })
}

export const like = async (id: number) => {
    const blog = await getBlogById(id)
    if (blog) {
        await db
            .update(blogs)
            .set({ likes: blog.likes + 1 })
            .where(eq(blogs.id, id))
    }
}
