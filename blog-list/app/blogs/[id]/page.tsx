import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import Link from "next/link";
import {likeBlog} from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <Link href={blog.url}>{blog.url}</Link>
            <form action={likeBlog}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit">({blog.likes} likes)</button>
            </form>
        </div>
    )
}

export default BlogPage