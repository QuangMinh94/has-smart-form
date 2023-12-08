"use client"

import React, { useCallback, useState, memo, useMemo, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Select, Empty, Spin } from "antd"

import { getDepartment } from "@/app/(service)/department"
import { getGroup } from "@/app/(service)/group"
import { GetAuthen } from "@/app/(service)/authen"
import { getCadasTrals } from "@/app/(service)/cadastrals"
import { cateGoriFilter } from "@/app/(service)/category"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { ToFilterName } from "@/util/formatText"
import { useEnvContext } from "next-runtime-env"
type Type =
    | "getAuth"
    | "getDepartment"
    | "getGroup"
    | "getProvince"
    | "getDistrict"
    | "getWards"
    | "cateGoriFilter"
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
    idParent?: string
    objcheck?: any
}
type Option = { label: string; value: string; dataRow: any }

const UseFecthApi = ({
    token,
    session,
    type,
    enabled,
    idParent
}: {
    token: string
    session: string
    type: Type
    enabled: boolean
    idParent?: string
}) => {
    const {
        NEXT_PUBLIC_GET_AUTH,
        NEXT_PUBLIC_GET_DEPARTMENT,
        NEXT_PUBLIC_GET_GROUP,
        NEXT_PUBLIC_GET_CADASTRALS,
        NEXT_PUBLIC_CATEGORIES_FILTER
    } = useEnvContext()
    const Service = {
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
        },
        getProvince: async (): Promise<Option[]> => {
            const res = await getCadasTrals({
                url: NEXT_PUBLIC_GET_CADASTRALS!,
                bodyRequest: { type: "TTP" },
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
        },
        getDistrict: async (): Promise<Option[]> => {
            const res = await getCadasTrals({
                url: NEXT_PUBLIC_GET_CADASTRALS!,
                bodyRequest: { parent: idParent ?? "", type: "QH" },
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
        },
        getWards: async (): Promise<Option[]> => {
            const res = await getCadasTrals({
                url: NEXT_PUBLIC_GET_CADASTRALS!,
                bodyRequest: { parent: idParent ?? "", type: "PX" },
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
        },
        cateGoriFilter: async (): Promise<Option[]> => {
            const res = await cateGoriFilter({
                url: NEXT_PUBLIC_CATEGORIES_FILTER!,
                bodyRequest: { type: "DepartmentType" },
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
    enabledFecthData,
    idParent,
    objcheck
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
        idParent
    })

    const HandlerfilterOption = useCallback(
        (input: string, option: any) =>
            ToFilterName(option?.label ?? "").includes(ToFilterName(input)),
        []
    )

    const CustomData = useMemo(() => {
        let dataNew: Option[] = data ?? []
        console.log("dataNew: ", dataNew)
        console.log("department: ", idDepartment)
        if (idDepartment && type === "getGroup") {
            dataNew =
                dataNew?.filter(
                    (item) => item?.dataRow?.department?._id === idDepartment
                ) ?? []
        }
        if (objcheck) {
            dataNew =
                dataNew?.filter((item) => !objcheck[item?.dataRow?._id]) ?? []
        }
        return dataNew
    }, [JSON.stringify(data), idDepartment])

    useEffect(() => {
        if (idParent) {
            refetch()
        }
    }, [idParent])
    const HanderenabledFecth = useCallback(() => {
        if (!idParent) {
            setenabledFecth(true)
        }
    }, [])
    return (
        <Select
            loading={isRefetching}
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
            onSelect={onSelect}
            options={CustomData}
            value={value}
            notFoundContent={
                isRefetching || isLoading ? (
                    <Spin size="small" />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
            }
        />
    )
}

export default memo(CustomerSelect)
