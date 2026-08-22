import { NextResponse } from "next/server"
import { db } from "@/db"
import { blogs, readingListItems, readingLists, users } from "@/db/schema"
import { getTestingEndpointProductionResponse } from "../helpers"

export const DELETE = async () => {
    const productionResponse = getTestingEndpointProductionResponse()
    if (productionResponse) {
        return productionResponse
    }

    await db.delete(readingListItems)
    await db.delete(readingLists)
    await db.delete(blogs)
    await db.delete(users)

    return NextResponse.json({ message: "Database reset" })
}
