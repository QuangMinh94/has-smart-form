"use client"

import { useQuery } from "@tanstack/react-query"
import { Empty, Select, Spin } from "antd"
import React, { memo, useEffect, useMemo, useState } from "react"

import { GetAuthen } from "@/app/(service)/authen"
import { getCadasTrals } from "@/app/(service)/cadastrals"
import { cateGoriFilter } from "@/app/(service)/category"
import { getDepartment } from "@/app/(service)/department"
import { getGroup } from "@/app/(service)/group"
import { getRoles } from "@/app/(service)/role"
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
    | "getRoles"
export type typeSelect = "authen" | "department" | "defaultGroup" // DANG DUNG O FORM USER
type Option = { label: string; value: string; dataRow: any }
type Props = {
    type: Type
    placeholder?: string
    onSelect?: (selectedKeys: string, dataRow: any, type?: typeSelect) => void
    onChange: (value: any, option?: any) => void
    defalutValue?: string
    disabled?: boolean
    idDepartment?: string
    value?: string
    mode?: "multiple"
    enabledFecthData?: boolean
    idParent?: string
    objcheck?: any
}

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
        NEXT_PUBLIC_CATEGORY,
        NEXT_PUBLIC_GET_ROLE
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
                bodyRequest: { active: true },
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
                url: NEXT_PUBLIC_CATEGORY!,
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
        },
        getRoles: async (): Promise<Option[]> => {
            const res = await getRoles({
                url: NEXT_PUBLIC_GET_ROLE!,
                bodyRequest: { Active: true },
                token,
                session
            })
            const roles: any[] = res.data

            const option: Option[] = roles.map((item) => ({
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

    const HandlerfilterOption = (input: string, option: any) =>
        ToFilterName(option?.label ?? "").includes(ToFilterName(input))

    const CustomData = useMemo(() => {
        let dataNew: Option[] = data ?? []
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

    const HanderenabledFecth = () => {
        if (!idParent) {
            setenabledFecth(true)
        }
    }

    if (error) {
        return <div style={{ color: "red" }}>có lỗi vui lòng thử lại !</div>
    }
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
