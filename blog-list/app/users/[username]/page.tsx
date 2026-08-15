import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import Link from "next/link";
import {likeBlog} from "@/app/actions/blogs";
import {getUserByUsername, getUserWithBlogs} from "@/app/services/users";
import BlogList from "@/app/components/bloglist";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params
    const user = await getUserWithBlogs(username)

    if (!user) {
        notFound()
    }

    return (
        <div>
            <h2>{user.username}</h2>
            <p>{user.name}</p>
            <BlogList blogs={user.blogs} />
        </div>
    )
}

export default UserPage