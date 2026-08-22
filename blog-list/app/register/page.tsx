"use client"

import { registerUser } from "../actions/users"
import { useActionState } from "react"
import PageTitle from "@/app/components/pagetitle"
import FormInput from "@/app/components/forminput"
import Button from "@/app/components/button"

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerUser, { error: "" })
    const errorTestId = state.error.toLowerCase().includes("username")
        ? "username-error"
        : state.error.toLowerCase().includes("confirmation")
          ? "passwordConfirm-error"
          : "form-error"

    return (
        <div>
            <PageTitle>Register</PageTitle>
            <form className="max-w-md space-y-4" action={formAction}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Username
                        <FormInput
                            type="text"
                            name="username"
                            required
                            defaultValue={state.values?.username}
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                        <FormInput
                            type="text"
                            name="name"
                            required
                            defaultValue={state.values?.name}
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                        <FormInput type="password" name="password" required />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                        <FormInput
                            type="password"
                            name="passwordConfirm"
                            required
                        />
                    </label>
                </div>
                <Button type="submit" data-testid="register-button">Register</Button>
                {state.error && (
                    <p className="text-red-600" data-testid={errorTestId}>
                        {state.error}
                    </p>
                )}
            </form>
        </div>
    )
}
