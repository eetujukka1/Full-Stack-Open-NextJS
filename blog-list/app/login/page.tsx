"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import PageTitle from "@/app/components/pagetitle"
import FormInput from "@/app/components/forminput"
import Button from "@/app/components/button"
import { useNotification } from "@/app/components/notificationcontext"

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState("")
    const { showNotification } = useNotification()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        })

        if (result?.error) {
            setError("Invalid username or password")
        } else {
            showNotification("Logged in successfully")
            router.push("/")
            router.refresh()
        }
    }

    return (
        <div>
            <PageTitle>Login</PageTitle>
            {error && (
                <p className="text-red-600" data-testid="error-message">
                    {error}
                </p>
            )}
            <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Username
                        <FormInput type="text" name="username" required />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                        <FormInput type="password" name="password" required />
                    </label>
                </div>
                <Button type="submit" data-testid="login-button">Login</Button>
            </form>
        </div>
    )
}
