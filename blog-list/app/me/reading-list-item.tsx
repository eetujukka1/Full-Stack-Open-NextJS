import { markCurrentUserReadingListItemAsRead } from "@/app/actions/blogs";
import Button from "@/app/components/button";
import type {blogs as schemaBlogs} from "@/db/schema";
import Link from "next/link";

interface ReadingListBlogItemProps {
    id: number
    blog: typeof schemaBlogs.$inferSelect
    showMarkAsRead?: boolean
}

interface ReadingListBlogItemsProps {
    items: Array<{
        id: number
        blog: typeof schemaBlogs.$inferSelect
    }>
    showMarkAsRead?: boolean
}

export const ReadingListBlogItem = ({ id, blog, showMarkAsRead = false }: ReadingListBlogItemProps) => {
    return (
        <div className="flex items-center justify-between gap-3 bg-yellow-100 p-2">
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            {showMarkAsRead && (
                <form action={markCurrentUserReadingListItemAsRead}>
                    <input type="hidden" name="id" value={id} />
                    <Button type="submit" data-testid={`mark-read-${id}`}>
                        Mark as read
                    </Button>
                </form>
            )}
        </div>
    )
}

export const ReadingListBlogItems = ({ items, showMarkAsRead = false }: ReadingListBlogItemsProps) => {
    return (
        <div className="space-y-2">
            {items.map((item) => (
                <ReadingListBlogItem
                    key={item.id}
                    id={item.id}
                    blog={item.blog}
                    showMarkAsRead={showMarkAsRead}
                />
            ))}
        </div>
    )
}
