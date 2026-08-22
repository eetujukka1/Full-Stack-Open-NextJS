import Link from "next/link"
import type { blogs as schemaBlogs } from "@/db/schema"

interface BlogListProps {
    blogs: Array<typeof schemaBlogs.$inferSelect>
}

const BlogList = ({ blogs }: BlogListProps) => {
    return (
        <>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>
                            {blog.title} by {blog.author}
                        </Link>
                        ({blog.likes} likes)
                    </li>
                ))}
            </ul>
            {blogs.length === 0 && <p>No blogs found</p>}
        </>
    )
}

export default BlogList
