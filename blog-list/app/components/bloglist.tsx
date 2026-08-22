import Link from "next/link"
import type { blogs as schemaBlogs } from "@/db/schema"

interface BlogListProps {
    blogs: Array<typeof schemaBlogs.$inferSelect>
}

const BlogList = ({ blogs }: BlogListProps) => {
    return (
        <div className="max-w-2xl mx-auto p-6" data-testid="blogs-list">
            <ul className="space-y-2">
                {blogs.map((blog) => (
                    <li className="border rounded p-3 hover:bg-gray-50" key={blog.id}>
                        <Link className="text-blue-600 hover:underline" href={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                        {" "}by {blog.author} ({blog.likes} likes)
                    </li>
                ))}
            </ul>
            {blogs.length === 0 && <p>No blogs found</p>}
        </div>
    )
}

export default BlogList
