"use client"

import { GetProduct, GetProductTree } from "@/app/(service)/eProduct"
import { eProduct } from "@/app/(types)/eProduct"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { ToFilterName } from "@/util/formatText"
import { useQuery } from "@tanstack/react-query"
import { Empty, Select, Spin } from "antd"
import { useEnvContext } from "next-runtime-env"
import React, { memo, useCallback, useState } from "react"
type Type = "getEProduct" | "getTreeEProduct"
type Props = {
    type: Type
    placeholder?: string
    onSelect?: (selectedKeys: string, dataRow: any) => void
    onChange: (value: string) => void
    defalutValue?: string
    disabled?: boolean
}
type Option = { label: string; value: string; dataRow: any }

const UseFecthApi = ({
    token,
    session,
    type,
    enabled
}: {
    token: string
    session: string
    type: Type
    enabled: boolean
}) => {
    const { NEXT_PUBLIC_GET_EPRODUCT, NEXT_PUBLIC_EPRODUCT_TREEDATA } =
        useEnvContext()
    const Service: any = {
        getEProduct: async (): Promise<Option[]> => {
            const res = await GetProduct({
                url: NEXT_PUBLIC_GET_EPRODUCT!,
                bodyRequest: { type: "P" },
                token,
                session
            })
            const Eproduct: eProduct[] = res.data
            const option: Option[] = Eproduct?.map((item) => ({
                value: item?._id ?? "",
                label: item?.name ?? "",
                dataRow: item
            }))
            return option
        },
        getTreeEProduct: async (): Promise<Option[]> => {
            const res = await GetProductTree({
                url: NEXT_PUBLIC_EPRODUCT_TREEDATA!,
                bodyRequest: { type: "P" },
                token,
                session
            })
            const Eproduct: eProduct[] = res.data
            const option: Option[] = Eproduct?.map((item) => ({
                value: item?._id ?? "",
                label: item?.name ?? "",
                dataRow: item
            }))
            return option
        }
    }
    const { isLoading, error, data, refetch } = useQuery<Option[]>({
        queryKey: [type],
        queryFn: async () => {
            const option = await Service[type]()

            return option
        },
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: enabled
    })

    return { isLoading, error, data, refetch }
}

const CustomerSelect: React.FC<Props> = ({
    onSelect,
    onChange,
    type,
    placeholder,
    defalutValue,
    disabled
}) => {
    const [enabledFecth, setenabledFecth] = useState<boolean>(false)
    const { token, session } = useCustomCookies()
    const { isLoading, error, data } = UseFecthApi({
        token,
        session,
        type: type,
        enabled: enabledFecth
    })

    const HandlerfilterOption = useCallback(
        (input: string, option: any) =>
            ToFilterName(option?.label ?? "").includes(ToFilterName(input)),
        []
    )

    return (
        <Select
            style={{ width: "100%" }}
            onClick={() => {
                setenabledFecth(true)
            }}
            disabled={disabled}
            filterOption={HandlerfilterOption}
            allowClear
            showSearch
            onChange={onChange}
            onSelect={onSelect}
            options={data}
            notFoundContent={
                isLoading ? (
                    <Spin size="small" />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
            }
        />
    )
}

export default memo(CustomerSelect)
