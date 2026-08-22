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

            <dl className="space-y-3" data-testid="user-profile">
                <div>
                    <dt className="text-sm font-medium text-gray-700">Name</dt>
                    <dd data-testid="user-name">{user.name}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-700">Username</dt>
                    <dd data-testid="user-username">{user.username}</dd>
                </div>
            </dl>

            <section className="space-y-3" data-testid="reading-list-section">
                <h2 className="text-lg font-semibold">Reading list</h2>
                {readingListItems.length === 0 ? (
                    <p className="text-gray-700" data-testid="empty-reading-list">
                        Your reading list is empty.
                    </p>
                ) : (
                    <>
                    {unreadReadingListItems.length > 0 && (
                        <div className="space-y-2" data-testid="unread-section">
                            <h3 className="text-base font-medium">Unread</h3>
                            <ReadingListBlogItems items={unreadReadingListItems} showMarkAsRead />
                        </div>
                    )}
                    {unreadReadingListItems.length === 0 && (
                        <p className="text-gray-700" data-testid="no-unread-blogs">
                            No unread blogs.
                        </p>
                    )}
                    {readReadingListItems.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-base font-medium">Read</h3>
                            <ReadingListBlogItems items={readReadingListItems} />
                        </div>
                    )}
                    </>
                )}
            </section>

            <section className="space-y-3" data-testid="api-token-section">
                <h2 className="text-lg font-semibold">Personal API token</h2>
                {user.token ? (
                    <div
                        className="break-all rounded border border-gray-200 bg-gray-50 p-3 font-mono text-sm text-gray-900"
                        data-testid="token-display"
                    >
                        <code data-testid="api-token">{user.token}</code>
                    </div>
                ) : (
                    <p className="text-gray-700" data-testid="no-token-message">
                        No token has been generated yet.
                    </p>
                )}

                <form action={generatePersonalToken}>
                    <Button type="submit" data-testid="generate-token-button">
                        Generate new token
                    </Button>
                </form>
            </section>
        </div>
    )
}

export default MePage
