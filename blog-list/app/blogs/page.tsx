import { getBlogs } from "../services/blogs"
import Link from "next/link";

const Blogs = async ({
    searchParams,
}: {
    searchParams: Promise<{ filter?: string }>
}) => {
    const { filter } = await searchParams
    const search = filter?.trim() ?? ""
    const searchLower = search.toLowerCase()
    const blogs = [...await getBlogs()]
        .filter((blog) => {
            if (!searchLower) {
                return true
            }

            return `${blog.title} ${blog.author}`.toLowerCase().includes(searchLower)
        })
        .sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>Blogs</h2>
            <form action="/blogs">
                <label>
                    Search
                    <input type="text" name="filter" defaultValue={search} />
                </label>
                <button type="submit">Search</button>
            </form>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                        ({blog.likes} likes)
                    </li>
                ))}
            </ul>
            {blogs.length === 0 && <p>No blogs found</p>}
        </div>
    )
}
export default Blogs
