"use client"

import React, { useEffect, useCallback, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Select, Empty, Spin } from "antd"
import { eProduct, requestBodyEproduct } from "@/app/(types)/eProduct"
import { GetProduct } from "@/app/(service)/eProduct"
import { useCookies } from "next-client-cookies"
import { ToFilterName } from "../../../../util/formatText"

type Props = {
    parent?: string
    onChange: (value: string) => void
    typeQuery: string
    placeholder: string
    setDataService?: React.Dispatch<React.SetStateAction<eProduct[]>>
    defalutValue?: string
}

const UseFecthApi = (
    token: string,
    session: string,
    body: requestBodyEproduct,
    type: string,
    enabled: boolean
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
        refetchOnReconnect: false,
        enabled: enabled
    })

    return { isLoading, error, data, refetch }
}
const CustomerSelect: React.FC<Props> = ({
    parent,
    onChange,
    typeQuery,
    placeholder,
    setDataService,
    defalutValue
}) => {
    const [enabledFecth, setenabledFecth] = useState<boolean>(false)
    const cookies = useCookies()
    const { isLoading, error, data, refetch } = UseFecthApi(
        cookies?.get("token") ?? "",
        cookies?.get("session") ?? "",
        parent !== undefined ? { parent } : { type: "P" },
        typeQuery,
        enabledFecth
    )
    // if (error) {
    //     return <div style={{ color: "red" }}>có lỗi</div>
    // }
    useEffect(() => {
        if (parent && enabledFecth) {
            refetch()
        }
    }, [parent])
    useEffect(() => {
        if (parent) {
            setDataService && setDataService(data ?? [])
        }
    }, [data])
    const HandlerfilterOption = useCallback(
        (input: string, option: any) =>
            ToFilterName(option?.label ?? "").includes(ToFilterName(input)),
        []
    )

    return (
        <Select
            onClick={() => {
                setenabledFecth(true)
            }}
            defaultValue={defalutValue || undefined}
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={onChange}
            options={data?.map((value) => ({
                value: value._id,
                label: value?.name
            }))}
            filterOption={HandlerfilterOption}
            notFoundContent={
                isLoading ? (
                    <Spin size="small" />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
            }
            showSearch
            allowClear
        />
    )
}

export default CustomerSelect
