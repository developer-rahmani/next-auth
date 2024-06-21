"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Header = () => {
    const { data, status } = useSession()
    return (
        <div className="flex items-center w-full h-[60px] bg-gray-900 p-[12px]">
            {status === 'authenticated' ? <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>logout</button> : status === "unauthenticated" ? <Link href="/login">login</Link> : null}
        </div>
    )
}

export default Header