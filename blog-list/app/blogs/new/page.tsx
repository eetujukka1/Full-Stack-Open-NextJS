"use client"
import { createBlog } from "@/app/actions/blogs";
import {useActionState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useNotification} from "@/app/components/notificationcontext";
import PageTitle from "@/app/components/pagetitle";
import FormInput from "@/app/components/forminput";
import Button from "@/app/components/button";

const NewBlog = () => {
    const router = useRouter()
    const { showNotification } = useNotification()
    const [state, formAction] = useActionState(createBlog, { error: "" })

    useEffect(() => {
        if (state.notification) {
            showNotification(state.notification.message, state.notification.type)
        }

        if (state.redirectTo) {
            router.push(state.redirectTo)
        }
    }, [router, showNotification, state.notification, state.redirectTo])

    return (
        <div>
            <PageTitle>Create a new blog</PageTitle>
            <form className="max-w-md space-y-4" action={formAction}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                        <FormInput
                            type="text"
                            name="title"
                            required
                            defaultValue={state.values?.title}
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Author
                        <FormInput
                            type="text"
                            name="author"
                            required
                            defaultValue={state.values?.author}
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        URL
                        <FormInput
                            type="text"
                            name="url"
                            required
                            defaultValue={state.values?.url}
                        />
                    </label>
                </div>
                <Button type="submit" data-testid="create-blog-button">Create</Button>
                {state.error && <p className="text-red-600">{state.error}</p>}
            </form>
        </div>
    )
}

export default NewBlog
