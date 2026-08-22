import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import Link from "next/link";
import {likeBlog} from "@/app/actions/blogs";
import PageTitle from "@/app/components/pagetitle";
import Button from "@/app/components/button";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div className="max-w-2xl">
            <PageTitle>{blog.title}</PageTitle>
            <div className="space-y-4">
                <p className="text-sm font-medium text-gray-600">
                    by {blog.author}
                </p>
                <Link className="break-words text-blue-600 hover:underline" href={blog.url}>
                    {blog.url}
                </Link>
            </div>
            <form className="mt-6" action={likeBlog}>
                <input type="hidden" name="id" value={blog.id} />
                <Button type="submit">{blog.likes} likes</Button>
            </form>
        </div>
    )
}

export default BlogPage
