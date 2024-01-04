import { searchIntergration } from "@/app/(service)/connection"
import {
    RequestSearchIntergration,
    connnector,
    integration
} from "@/app/(types)/Connecter"
import useCustomeCookies from "@/components/cusTomHook/useCustomCookies"
import { useQuery } from "@tanstack/react-query"
import { Popover, Space, Spin, Tag } from "antd"
import { useEnvContext } from "next-runtime-env"
import React, { memo, useEffect, useMemo } from "react"

type PropsContent = {
    idEproduct: string
    connectionCount: number
}
type PropsApp = PropsContent & {
    children: React.ReactNode
}
export const FecthIntergration = ({
    key,
    request,
    enabled
}: {
    key: string
    request: RequestSearchIntergration
    enabled: boolean
}) => {
    const { NEXT_PUBLIC_SEARCH_INTEGRATION } = useEnvContext()
    const { session, token } = useCustomeCookies()
    const { isLoading, error, data, refetch, isRefetching } = useQuery<
        integration[]
    >({
        queryKey: [`getIntergaration${key}`],
        queryFn: async () => {
            const res = await searchIntergration({
                url: NEXT_PUBLIC_SEARCH_INTEGRATION!,
                session,
                token,
                bodyRequest: request
            })

            return res.data
        },
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled
    })

    return { error, data, refetch, isLoading, isRefetching }
}
export const CustomdataDulicateConnnector = (
    data: integration[]
): connnector[] => {
    const obj: any = {}
    data.forEach((item, index) => {
        obj[item?.connection?._id] = item.connection
    })
    return Object.values(obj)
}
const Content: React.FC<PropsContent> = ({ idEproduct, connectionCount }) => {
    const { data, isLoading, error, refetch, isRefetching } = FecthIntergration(
        {
            request: { eProduct: idEproduct },
            key: idEproduct,
            enabled: false
        }
    )
    const list: any = useMemo(() => {
        const DuplicateConntor = CustomdataDulicateConnnector(data ?? [])
        return DuplicateConntor.map((item) => (
            <Tag key={item?._id} color="cyan">
                {item?.name}
            </Tag>
        ))
    }, [isRefetching, isLoading])
    useEffect(() => {
        refetch()
    }, [connectionCount])

    if (isLoading) {
        return <Spin />
    }
    if (error) {
        return <div style={{ color: "red" }}>có lỗi, vui lòng thử lại sau</div>
    }

    return (
        <Space
            style={{ maxWidth: "20vw", maxHeight: "20vh", overflow: "auto" }}
            size={[0, 8]}
            wrap
        >
            {list}
        </Space>
    )
}
const App: React.FC<PropsApp> = ({ children, idEproduct, connectionCount }) => {
    return (
        <Popover
            content={
                <Content
                    connectionCount={connectionCount}
                    idEproduct={idEproduct}
                />
            }
            title="connector"
        >
            {children}
        </Popover>
    )
}

export default memo(App)
