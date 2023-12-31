import { Users } from "@/app/(types)/Users"
import { useSession } from "next-auth/react"
const UseGetInfoUser = (): {
    InFoUser: Users
    status: "loading" | "authenticated" | "unauthenticated"
} => {
    const { data: session, status } = useSession()
    const InFoUser: Users = session?.user.userInfo
    return { InFoUser, status }
}
export default UseGetInfoUser
