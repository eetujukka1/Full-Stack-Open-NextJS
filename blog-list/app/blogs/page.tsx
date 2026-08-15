import { getBlogs } from "../services/blogs"
import BlogList from "../components/bloglist"

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
            <BlogList blogs={blogs} />
        </div>
    )
}
export default Blogs
