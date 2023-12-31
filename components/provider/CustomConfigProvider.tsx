"use client"
import { ConfigProvider } from "antd"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import React, { useState, useEffect } from "react"
import {
    contextCustomeTheme,
    typeContextCustomeTheme
} from "@/components/context/context"
import { getOrganization } from "@/app/(service)/organizations"
import { useEnvContext } from "next-runtime-env"
import { useQuery } from "@tanstack/react-query"
import { Organization } from "@/app/(types)/Organization"
import Loading from "@/components/LoadingPage"
import { usePathname } from "next/navigation"
type Props = { children: React.ReactNode }

const UseFecthApi = ({
    token,
    session
}: {
    token: string
    session: string
}) => {
    const { NEXT_PUBLIC_GET_ORGANIZATIONS } = useEnvContext()
    const { isLoading, error, data, refetch } = useQuery<Organization>({
        queryKey: ["getOrganization"],
        queryFn: async () => {
            const res = await getOrganization({
                url: NEXT_PUBLIC_GET_ORGANIZATIONS!,
                bodyRequest: {},
                token,
                session
            })
            return res.data[0]
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
    const { data, isLoading, refetch } = UseFecthApi({ token, session })
    const pathname = usePathname()
    const Origanization = data
    const primaryInfo = Origanization?.themeGlobal?.theme?.token?.colorPrimary
    const IconInfo = Origanization?.themeGlobal?.logo
    const [primaryColor, setPrimaryColor] = useState<string>(
        primaryInfo ?? "#0E7490"
    )
    const [logo, setLogo] = useState<string>(IconInfo ?? "")

    useEffect(() => {
        if (primaryInfo && IconInfo) {
            setPrimaryColor(primaryInfo)
            setLogo(IconInfo)
        }
    }, [primaryInfo, IconInfo])

    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [token])
    const value: typeContextCustomeTheme = {
        setPrimaryColor,
        primaryColor,
        setLogo,
        logo
    }

    return (
        <contextCustomeTheme.Provider value={value}>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: primaryColor
                        },
                        Menu: {
                            colorBgContainer: primaryColor,
                            itemColor: "white",
                            itemHoverBg: "white"
                        },
                        Layout: {
                            siderBg: primaryColor,
                            triggerBg: primaryColor
                        },
                        Table: {
                            headerBg: primaryColor,
                            headerColor: "white",
                            headerSortActiveBg: primaryColor,
                            headerSortHoverBg: primaryColor,
                            algorithm: true
                        },
                        Form: {
                            labelRequiredMarkColor: "#991B1B",
                            colorError: "#991B1B",
                            itemMarginBottom: 1
                        },
                        Avatar: {
                            colorBgContainer: "black"
                        }
                    },
                    token: {
                        colorPrimary: primaryColor,
                        colorBgContainer: "#fff"
                    }
                }}
            >
                {isLoading && token && !pathname.startsWith("/auth") ? (
                    <Loading />
                ) : (
                    children
                )}
            </ConfigProvider>
        </contextCustomeTheme.Provider>
    )
}
export default CusomerConfigProvider
