"use client"
import Loading from "../LoadingPage"
import { Users } from "@/app/(types)/Users"
import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
    contextProfile,
    typeContextProfile
} from "@/components/context/context"
import { useEnvContext } from "next-runtime-env"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { usePathname } from "next/navigation"
type Props = { children: React.ReactNode }

const FecthProfile = ({
    token,
    session
}: {
    token: string
    session: string
}) => {
    const { NEXT_PUBLIC_GET_USER_ID, NEXT_PUBLIC_GET_USER_IMAGE } =
        useEnvContext()

    const { isLoading, error, data, refetch } = useQuery<Users>({
        queryKey: ["getInforUser"],
        queryFn: async () => {
            const [resUser, resImg] = await Promise.all([
                fetch(NEXT_PUBLIC_GET_USER_ID!, {
                    headers: {
                        Authorization: "Bearer " + token,
                        Session: session
                    }
                }),
                fetch(NEXT_PUBLIC_GET_USER_IMAGE!, {
                    headers: {
                        Authorization: "Bearer " + token,
                        Session: session
                    }
                })
            ])
            const User = await resUser.json()
            const Image = await resImg.json()

            const user = User ?? {}
            const image =
                Image === "User dont have image"
                    ? { data: "", contentType: "" }
                    : Image
            const CustomeUser: Users = {
                ...user,
                image
            }
            return CustomeUser
        },
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: false
    })

    return { error, data, refetch, isLoading }
}
const CusomerConfigProvider: React.FC<Props> = ({ children }) => {
    const { token, session } = useCustomCookies()
    const pathname = usePathname()
    const { data, refetch, isLoading } = FecthProfile({ token, session })
    const [User, setUser] = useState<Users>({})
    useEffect(() => {
        if (data) {
            setUser(data)
        }
    }, [isLoading])
    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [token])

    const value: typeContextProfile = {
        setUser,
        User
    }

    return (
        <contextProfile.Provider value={value}>
            {isLoading && token && !pathname.startsWith("/auth") ? (
                <Loading />
            ) : (
                children
            )}
        </contextProfile.Provider>
    )
}
export default CusomerConfigProvider
