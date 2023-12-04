"use client"

import React, { useCallback, useState, memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Select, Empty, Spin } from "antd"

import { getDepartment } from "@/app/(service)/department"
import { getGroup } from "@/app/(service)/group"
import { GetAuthen } from "@/app/(service)/authen"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { ToFilterName } from "@/util/formatText"
import { useEnvContext } from "next-runtime-env"
type Type = "getAuth" | "getDepartment" | "getGroup"
export type typeSelect = "authen" | "department" | "defaultGroup"
type Props = {
    type: Type
    placeholder?: string
    onSelect?: (selectedKeys: string, dataRow: any, type?: typeSelect) => void
    onChange: (value: any) => void
    defalutValue?: string
    disabled?: boolean
    idDepartment?: string
    value?: string
    mode?: "multiple"
    enabledFecthData?: boolean
}
type Option = { label: string; value: string; dataRow: any }

const UseFecthApi = ({
    token,
    session,
    type,
    enabled,
    idDepartment
}: {
    token: string
    session: string
    type: Type
    enabled: boolean
    idDepartment: string
}) => {
    const {
        NEXT_PUBLIC_GET_AUTH,
        NEXT_PUBLIC_GET_DEPARTMENT,
        NEXT_PUBLIC_GET_GROUP
    } = useEnvContext()
    const Service: any = {
        getAuth: async (): Promise<Option[]> => {
            const res = await GetAuthen({
                url: NEXT_PUBLIC_GET_AUTH!,
                bodyRequest: { Active: true },
                token,
                session
            })
            const getAuth: any[] = res.data
            const option: Option[] = getAuth?.map((item) => ({
                value: item?._id ?? "",
                label: item?.name ?? "",
                dataRow: item
            }))
            return option
        },
        getDepartment: async (): Promise<Option[]> => {
            const res = await getDepartment({
                url: NEXT_PUBLIC_GET_DEPARTMENT!,
                bodyRequest: { Active: true },
                token,
                session
            })
            const department: any[] = res.data
            const option: Option[] = department?.map((item) => ({
                value: item?._id ?? "",
                label: item?.name ?? "",
                dataRow: item
            }))
            return option
        },
        getGroup: async (): Promise<Option[]> => {
            const res = await getGroup({
                url: NEXT_PUBLIC_GET_GROUP!,
                bodyRequest: { Active: true },
                token,
                session
            })
            const group: any[] = res.data

            const option: Option[] = group.map((item) => ({
                value: item?._id ?? "",
                label: item?.name ?? "",
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
    onSelect,
    onChange,
    type,
    placeholder,
    defalutValue,
    disabled,
    idDepartment,
    value,
    mode,
    enabledFecthData
}) => {
    const [enabledFecth, setenabledFecth] = useState<boolean>(
        !!enabledFecthData
    )
    const { token, session } = useCustomCookies()
    const { isRefetching, error, data, refetch, isLoading } = UseFecthApi({
        token,
        session,
        type: type,
        enabled: enabledFecth,
        idDepartment: idDepartment ?? ""
    })

    const HandlerfilterOption = useCallback(
        (input: string, option: any) =>
            ToFilterName(option?.label ?? "").includes(ToFilterName(input)),
        []
    )
    const CustomData = useMemo(() => {
        let dataNew: Option[] = data ?? []
        if (idDepartment || type === "getGroup") {
            dataNew =
                dataNew?.filter(
                    (item) => item?.dataRow?.department?._id === idDepartment
                ) ?? []
        }
        return dataNew
    }, [data?.length, idDepartment])

    return (
        <Select
            loading={isLoading}
            mode={mode}
            defaultValue={defalutValue ?? undefined}
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
            options={CustomData}
            value={value}
            notFoundContent={
                isRefetching ? (
                    <Spin size="small" />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
            }
        />
    )
}

export default memo(CustomerSelect)
