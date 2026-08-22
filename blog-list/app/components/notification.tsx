"use client"

import {useNotification} from "@/app/components/notificationcontext";

export default function Notification() {
    const { message, type } = useNotification()

    if (!message) return null

    const className = `mb-2.5 rounded px-4 py-2.5 text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
    }`

    return <div className={className} data-testid="notification">{message}</div>
}
