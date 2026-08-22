import { NextResponse } from "next/server"

export const getTestingEndpointProductionResponse = () => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 }
        )
    }

    return null
}
