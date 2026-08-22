import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"

const getBearerToken = (request: Request) => {
    const authorization = request.headers.get("authorization")
    const match = authorization?.match(/^Bearer\s+(.+)$/)

    return match?.[1]?.trim()
}

export const GET = async (request: Request) => {
    const token = getBearerToken(request)

    if (!token) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await db.query.users.findFirst({
        where: eq(users.token, token),
        with: { blogs: true },
    })

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({
        id: user.id,
        username: user.username,
        name: user.name,
        createdBlogs: user.blogs,
    })
}
