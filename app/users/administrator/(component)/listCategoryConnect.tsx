"use client"
import { cateGoriFilter } from "@/app/(service)/category"
import { Category } from "@/app/(types)/Categories"
import { connnector } from "@/app/(types)/Connecter"
import useCookies from "@/components/cusTomHook/useCustomCookies"
import { useQuery } from "@tanstack/react-query"
import { Spin } from "antd"
import { useEnvContext } from "next-runtime-env"
import React, { memo, useMemo } from "react"
import BtnModal from "./BtnModal"
const UseFecthApi = () => {
    const { NEXT_PUBLIC_CATEGORY } = useEnvContext()
    const { session, token } = useCookies()
    const { isLoading, error, data, refetch, isRefetching } = useQuery<any>({
        queryKey: ["getListcategoryConnection"],
        queryFn: async () => {
            const res = await cateGoriFilter({
                url: NEXT_PUBLIC_CATEGORY!,
                token,
                session,
                bodyRequest: { type: "ConnectorGroup" }
            })
            return res.data
        },
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    })

    return { isRefetching, error, data, refetch, isLoading }
}
const ListCategoryConnection: React.FC<{ HidenMoal: () => void }> = ({
    HidenMoal
}) => {
    const { error, data, isLoading } = UseFecthApi()
    const categories: Category[] = data ?? []
    const list = useMemo(() => {
        return categories?.map((item) => (
            <li
                className="cursor-pointer hover:opacity-[0.7] my-[5px]"
                key={item._id ?? ""}
            >
                <BtnModal
                    CancelModalParent={HidenMoal}
                    pathModel="ADMIN_CONNECTER_MANAGER"
                    type="ADD_MODAL"
                    isNameClicked={true}
                    rowData={
                        {
                            nameconnectorGroup: item.description,
                            connectorGroup: item._id
                        } as connnector
                    }
                    titleModel="Thêm kết nối"
                />
            </li>
        ))
    }, [isLoading])
    if (error) {
        ;<div style={{ color: "red" }}>có lỗi xảy ra vui lòng thử lại</div>
    }
    if (isLoading) {
        return <Spin />
    }
    return <ul>{list}</ul>
}
export default memo(ListCategoryConnection)
