"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import {addBlog, like} from "../services/blogs"
import {auth} from "@/auth";

export const createBlog = async (
    prevState: { error: string },
    formData: FormData
) => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    const title = formData.get("title") as string
    if (!title || title.length < 5) {
        return { error: "Blog title must be at least 5 characters long" }
    }
    const author = formData.get("author") as string
    if (!author || author.length < 5) {
        return { error: "Blog author must be at least 5 characters long" }
    }
    const url = formData.get("url") as string
    if (!url || url.length < 5) {
        return { error: "Blog URL must be at least 5 characters long" }
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
