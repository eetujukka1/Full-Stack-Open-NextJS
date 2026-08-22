"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

type RegisterUserValues = {
    username: string
    name: string
}

type RegisterUserState = {
    error: string
    values?: RegisterUserValues
}

const getTextField = (formData: FormData, field: string) => {
    const value = formData.get(field)
    return typeof value === "string" ? value.trim() : ""
}

export const registerUser = async (
    prevState: RegisterUserState,
    formData: FormData
): Promise<RegisterUserState> => {
    const username = getTextField(formData, "username")
    const name = getTextField(formData, "name")
    const password = formData.get("password")
    const passwordConfirm = formData.get("passwordConfirm")
    const values = { username, name }

    if (username.length < 4) {
        return { error: "Username must be at least 4 characters long", values }
    }
    if (typeof password !== "string" || password.length < 4) {
        return { error: "Password must be at least 4 characters long", values }
    }
    if (typeof passwordConfirm !== "string") {
        return { error: "Password confirmation is required", values }
    }
    if (passwordConfirm !== password) {
        return { error: "Password confirmation must match password", values }
    }

    const existingUser = await db.query.users.findFirst({
        where: eq(users.username, username),
    })
    if (existingUser) {
        return { error: "Username is already taken", values }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await db.insert(users).values({ username, name, passwordHash })

    redirect("/login")
}
