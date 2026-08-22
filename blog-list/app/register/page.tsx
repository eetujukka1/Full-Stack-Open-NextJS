"use client"

import { registerUser } from "../actions/users"
import { useActionState } from "react"

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerUser, { error: "" })

    return (
        <div>
            <h2>Register</h2>
            <form action={formAction}>
                <div>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            required
                            defaultValue={state.values?.username}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            required
                            defaultValue={state.values?.name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                </div>
                <div>
                    <label>
                        Confirm password
                        <input
                            type="password"
                            name="passwordConfirm"
                            required
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
                {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            </form>
        </div>
    )
}
