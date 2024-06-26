
import { logout } from "@/api/login"
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from "next/link"
import LogoutButton from "./logout-button"

const Header = async () => {
    const data = await getServerAuthSession()

    return (
        <div className="flex items-center w-full h-[60px] bg-gray-900 p-[12px]">
            {data?.isLogged ? <LogoutButton /> : <Link href="/login">login</Link>}
        </div>
    )
}

export default Header