"use client"

import React, { useEffect, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { Select } from "antd"
import type { SelectProps } from "antd"
import { eProduct, requestBodyEproduct } from "@/app/(types)/eProduct"
import { GetProduct } from "@/app/(service)/eProduct"
import { useCookies } from "next-client-cookies"
import { ToFilterName } from "../../../../util/formatText"
const handleChange = (value: string) => {
    console.log(`selected ${value}`)
}

type Props = {
    parent?: string
    onChange: (value: string) => void
    typeQuery: string
}

const UseFecthApi = (
    token: string,
    session: string,
    body: requestBodyEproduct,
    type: string
) => {
    const { isLoading, error, data, refetch } = useQuery<eProduct[]>({
        queryKey: [type],
        queryFn: async () => {
            const res = await GetProduct({
                bodyRequest: body,
                token,
                session
            })
            return res.data
        },
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    })

    return { isLoading, error, data, refetch }
}
const CustomerSelect: React.FC<Props> = ({ parent, onChange, typeQuery }) => {
    const cookies = useCookies()
    const { isLoading, error, data, refetch } = UseFecthApi(
        cookies?.get("token") ?? "",
        cookies?.get("session") ?? "",
        parent !== undefined ? { parent } : { type: "P" },
        typeQuery
    )
    // if (error) {
    //     return <div style={{ color: "red" }}>có lỗi</div>
    // }
    useEffect(() => {
        refetch()
    }, [parent])
    const HandlerfilterOption = useCallback(
        (input: string, option: any) =>
            ToFilterName(option?.label ?? "").includes(ToFilterName(input)),
        []
    )

    return (
        <Select
            loading={isLoading}
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            onChange={onChange}
            options={data?.map((value) => ({
                value: value._id,
                label: value?.name
            }))}
            filterOption={HandlerfilterOption}
            showSearch
            allowClear
        />
    )
}

export default CustomerSelect
