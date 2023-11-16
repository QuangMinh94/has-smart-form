"use client"
import React, { useCallback, useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { TreeSelect, Empty, Spin } from "antd"
import {
    eProduct,
    requestBodyEproduct,
    OptionTree
} from "@/app/(types)/eProduct"
import { GetProductTree } from "@/app/(service)/eProduct"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { ToFilterName } from "../../../../util/formatText"

type Props = {
    typeQuery: string
    placeholder: string
    onSelect: (selectedKeys: string, info: OptionTree) => void
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
            const res = await GetProductTree({
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
    onSelect,
    typeQuery,
    placeholder,
    defalutValue
}) => {
    const [enabledFecth, setenabledFecth] = useState<boolean>(false)
    const { token, session } = useCustomCookies()
    const { isLoading, error, data } = UseFecthApi(
        token,
        session,
        {},
        typeQuery,
        enabledFecth
    )
    const TreeDataOption = useMemo(() => {
        return MappingChildren(data ?? [])
    }, [data?.length])

    const HandlerfilterOption = useCallback(
        (input: string, option: any) =>
            ToFilterName(option?.label ?? "").includes(ToFilterName(input)),
        []
    )
    function MappingChildren(product: eProduct[]): OptionTree[] {
        if (product.length === 0) return []

        const childrenView: OptionTree[] = []
        product.forEach((element, index) => {
            childrenView.push({
                value: element?.name + element._id ?? "",
                title: element?.name,
                children:
                    element?.children && element?.children.length > 0
                        ? MappingChildren(element?.children ?? [])
                        : [],
                formTemplate: element?.formTemplate ?? []
            })
        })
        return childrenView
    }

    return (
        <TreeSelect
            defaultValue={defalutValue || undefined}
            onClick={() => setenabledFecth(true)}
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder={placeholder}
            allowClear
            treeDefaultExpandAll
            onSelect={onSelect}
            treeData={TreeDataOption}
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

export default CustomerSelect
