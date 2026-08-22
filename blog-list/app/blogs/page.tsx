import { getBlogs } from "../services/blogs"
import BlogList from "../components/bloglist"
import PageTitle from "../components/pagetitle"
import FormInput from "../components/forminput"
import Button from "../components/button"

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
            <PageTitle>Blogs</PageTitle>
            <form className="mx-auto mb-6 flex max-w-md items-end gap-2" action="/blogs">
                <label className="flex-1 text-sm font-medium text-gray-700">
                    Search
                    <FormInput type="text" name="filter" defaultValue={search} />
                </label>
                <Button type="submit">Search</Button>
            </form>
            <BlogList blogs={blogs} />
        </div>
    )
}
export default Blogs
