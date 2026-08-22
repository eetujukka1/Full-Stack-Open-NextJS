import { notFound } from "next/navigation"
import {getUserWithBlogs} from "@/app/services/users";
import BlogList from "@/app/components/bloglist";
import PageTitle from "@/app/components/pagetitle";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params
    const user = await getUserWithBlogs(username)

    if (!user) {
        notFound()
    }

    return (
        <div>
            <PageTitle>{user.username}</PageTitle>
            <p>{user.name}</p>
            <BlogList blogs={user.blogs} />
        </div>
    )
}

export default UserPage
