"use server"

import { redirect } from "next/navigation"
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
    values?: BlogFormValues
}

export const createBlog = async (
    prevState: CreateBlogState,
    formData: FormData
): Promise<CreateBlogState> => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
    const values = { title, author, url }

    if (!title || title.length < 5) {
        return { error: "Blog title must be at least 5 characters long", values }
    }
    if (!author || author.length < 5) {
        return { error: "Blog author must be at least 5 characters long", values }
    }
    if (!url || url.length < 5) {
        return { error: "Blog URL must be at least 5 characters long", values }
    }
    const likes = 0
    await addBlog(title, author, url, likes)

    revalidatePath("/blogs")
    redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"))
    await like(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}
