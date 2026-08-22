"use client"
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"
import type { ReactNode } from "react";
import Button from "@/app/components/button";

interface NavLinkProps {
    href: string
    children: ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => (
    <Link className="hover:text-gray-300" href={href}>
        {children}
    </Link>
)

export default function Navbar() {
    const { data: session } = useSession()
    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
            <NavLink href="/">home</NavLink>
            {" | "}
            <NavLink href="/blogs">blogs</NavLink>
            {" | "}
            <NavLink href="/users">users</NavLink>
            {" | "}
            {session ? (
                <>
                    <NavLink href="/blogs/new">new blog</NavLink>
                    {" | "}
                    <NavLink href="/me">me</NavLink>
                    {" | "}
                    <em className="text-gray-300">{session.user?.name} logged in</em>{" "}
                    <Button onClick={() => signOut()}>logout</Button>
                </>
            ) : (
                <>
                    <NavLink href="/login">login</NavLink>
                    {" | "}
                    <NavLink href="/register">register</NavLink>
                </>
            )}
        </nav>
    )
}
