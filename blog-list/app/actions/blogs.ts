"use server"

import { revalidatePath } from "next/cache"
import {addBlog, like} from "../services/blogs"
import {auth} from "@/auth";

type BlogFormValues = {
    title: string
    author: string
    url: string
}

type CreateBlogState = {
    error: string
    notification?: {
        message: string
        type: "success" | "error"
    }
    redirectTo?: string
    values?: BlogFormValues
}

export const createBlog = async (
    prevState: CreateBlogState,
    formData: FormData
): Promise<CreateBlogState> => {
    const session = await auth()
    if (!session) {
        return {
            error: "You must be logged in to create a blog",
            redirectTo: "/login",
        }
    }
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
    const values = { title, author, url }

    if (!title || title.length < 5) {
        const message = "Blog title must be at least 5 characters long"
        return { error: message, values }
    }
    if (!author || author.length < 5) {
        const message = "Blog author must be at least 5 characters long"
        return { error: message, values }
    }
    if (!url || url.length < 5) {
        const message = "Blog URL must be at least 5 characters long"
        return { error: message, values }
    }
    const likes = 0
    await addBlog(title, author, url, likes)

    revalidatePath("/blogs")
    return {
        error: "",
        notification: {
            message: `Created blog "${title}"`,
            type: "success",
        },
        redirectTo: "/blogs",
    }
}

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"))
    await like(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}
