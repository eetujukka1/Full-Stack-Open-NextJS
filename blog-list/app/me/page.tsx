import { redirect } from "next/navigation"
import { generatePersonalToken } from "@/app/actions/users"
import Button from "@/app/components/button"
import PageTitle from "@/app/components/pagetitle"
import {getCurrentUserWithReadingList} from "@/app/services/session"
import { ReadingListBlogItems } from "@/app/me/reading-list-item"

const MePage = async () => {
    const user = await getCurrentUserWithReadingList()

    if (!user) {
        redirect("/login")
    }

    const readingListItems = user.readingList?.items ?? []
    const unreadReadingListItems = readingListItems.filter((item) => !item.read)
    const readReadingListItems = readingListItems.filter((item) => item.read)

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

            {readingListItems.length > 0 && (
                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Reading list</h2>
                    {unreadReadingListItems.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-base font-medium">Unread</h3>
                            <ReadingListBlogItems items={unreadReadingListItems} showMarkAsRead />
                        </div>
                    )}
                    {readReadingListItems.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-base font-medium">Read</h3>
                            <ReadingListBlogItems items={readReadingListItems} />
                        </div>
                    )}
                </section>
            )}

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
