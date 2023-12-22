"use client"
import { SearchUser } from "@/app/(service)/User"
import { cateGoriFilter } from "@/app/(service)/category"
import { GetProduct } from "@/app/(service)/eProduct"
import { Category } from "@/app/(types)/Categories"
import { Users } from "@/app/(types)/Users"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { ToFilterName } from "@/util/formatText"
import { useQuery } from "@tanstack/react-query"
import { Empty, Select, Spin } from "antd"
import { useEnvContext } from "next-runtime-env"
import React, { memo, useState } from "react"
type Type = "getUser" | "getEProduct" | "getcategories"

type Option = { label: string; value: string; dataRow: any }
type Props = {
    type: Type
    placeholder?: string
    onChange: (value: any, option?: any) => void
    defalutValue?: string
    disabled?: boolean
    value?: string
    mode?: "multiple"
    enabledFecthData?: boolean
}

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
    const {
        NEXT_PUBLIC_SEARCH_USER,
        NEXT_PUBLIC_GET_EPRODUCT,
        NEXT_PUBLIC_CATEGORY
    } = useEnvContext()

    const Service = {
        getUser: async (): Promise<Option[]> => {
            const res = await SearchUser({
                url: NEXT_PUBLIC_SEARCH_USER!,
                bodyRequest: { active: true, name: "" },
                token,
                session
            })
            const Users: Users[] = res.data
            const option: Option[] = Users?.map((item) => ({
                value: item?._id ?? "",
                label: `${item?.firstName ?? ""} ${item?.lastName ?? ""}`,
                dataRow: item
            }))
            return option
        },
        getEProduct: async (): Promise<Option[]> => {
            const res = await GetProduct({
                url: NEXT_PUBLIC_GET_EPRODUCT!,
                bodyRequest: { type: "B", active: true },
                token,
                session
            })
            const Products: any[] = res.data
            const option: Option[] = Products?.map((item) => ({
                value: item?._id ?? "",
                label: item?.name ?? "",
                dataRow: item
            }))
            return option
        },
        getcategories: async (): Promise<Option[]> => {
            const res = await cateGoriFilter({
                url: NEXT_PUBLIC_CATEGORY!,
                bodyRequest: { type: "StatusForm" },
                token,
                session
            })
            const Categories: Category[] = res.data
            const option: Option[] = Categories?.map((item) => ({
                value: item?._id ?? "",
                label: item?.description ?? "",
                dataRow: item
            }))
            return option
        }
    }
    const { isLoading, error, data, refetch, isRefetching } = useQuery<
        Option[]
    >({
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

    return { isRefetching, error, data, refetch, isLoading }
}

const CustomerSelect: React.FC<Props> = ({
    onChange,
    type,
    placeholder,
    defalutValue,
    disabled,
    value,
    mode,
    enabledFecthData
}) => {
    const [enabledFecth, setenabledFecth] = useState<boolean>(
        !!enabledFecthData
    )

    const { token, session } = useCustomCookies()
    const { data, isLoading, error } = UseFecthApi({
        token,
        session,
        type: type,
        enabled: enabledFecth
    })

    if (error) {
        return <div style={{ color: "red" }}>có lỗi vui lòng thử lại !</div>
    }
    const HandlerfilterOption = (input: string, option: any) =>
        ToFilterName(option?.label ?? "").includes(ToFilterName(input))

    const HanderenabledFecth = () => {
        setenabledFecth(true)
    }
    return (
        <Select
            loading={isLoading}
            mode={mode}
            defaultValue={defalutValue ?? undefined}
            style={{ width: "100%" }}
            onClick={HanderenabledFecth}
            onFocus={HanderenabledFecth}
            disabled={disabled}
            filterOption={HandlerfilterOption}
            allowClear
            showSearch
            onChange={onChange}
            placeholder={isLoading ? "vui lòng đợi..." : undefined}
            options={data}
            value={isLoading ? undefined : value ?? undefined}
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
