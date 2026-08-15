import { db } from "../../db"
import {blogs, users} from "../../db/schema"
import {eq} from "drizzle-orm";

export const getUsers = async () => {
    return db.query.users.findMany()
}

export const getUserByUsername = (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
    })
}

export const getUserWithBlogs = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true },
    })
}