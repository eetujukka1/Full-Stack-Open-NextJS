import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getTestingEndpointProductionResponse } from "../helpers"

export const POST = async (request: Request) => {
    const productionResponse = getTestingEndpointProductionResponse()
    if (productionResponse) {
        return productionResponse
    }

    const { username, name, password } = await request.json()
    const passwordHash = await bcrypt.hash(password, 10)
    const [user] = await db
        .insert(users)
        .values({ username, name, passwordHash })
        .returning({
            id: users.id,
            username: users.username,
            name: users.name,
        })

    return NextResponse.json(user, { status: 201 })
}
