import { redirect } from "next/navigation"
import { generatePersonalToken } from "@/app/actions/users"
import Button from "@/app/components/button"
import PageTitle from "@/app/components/pagetitle"
import { getCurrentUser } from "@/app/services/session"

const MePage = async () => {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="max-w-2xl space-y-6">
            <PageTitle>My account</PageTitle>

            <dl className="space-y-3">
                <div>
                    <dt className="text-sm font-medium text-gray-700">Name</dt>
                    <dd>{user.name}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-700">Username</dt>
                    <dd>{user.username}</dd>
                </div>
            </dl>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Personal API token</h2>
                {user.token ? (
                    <p className="break-all rounded border border-gray-200 bg-gray-50 p-3 font-mono text-sm text-gray-900">
                        {user.token}
                    </p>
                ) : (
                    <p className="text-gray-700">
                        No token has been generated yet.
                    </p>
                )}

                <form action={generatePersonalToken}>
                    <Button type="submit">Generate new token</Button>
                </form>
            </section>
        </div>
    )
}

export default MePage
