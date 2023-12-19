"use client"
import React, { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { TreeSelect, Empty, Spin } from "antd"
import {
    eProduct,
    requestBodyEproduct,
    OptionTree
} from "@/app/(types)/eProduct"
import { GetProductTree } from "@/app/(service)/eProduct"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"

import { useEnvContext } from "next-runtime-env"
type Props = {
    typeQuery: string
    placeholder: string
    onSelect: (selectedKeys: string, info: OptionTree) => void
    defalutValue?: string
    onClear?: () => void
}

const UseFecthApi = (
    token: string,
    session: string,
    body: requestBodyEproduct,
    type: string,
    enabled: boolean
) => {
    const { NEXT_PUBLIC_EPRODUCT_TREEDATA } = useEnvContext()
    const { isLoading, error, data, refetch } = useQuery<eProduct[]>({
        queryKey: [type],
        queryFn: async () => {
            const res = await GetProductTree({
                url: NEXT_PUBLIC_EPRODUCT_TREEDATA!,
                bodyRequest: body,
                token,
                session
            })
            console.log("tree", res.data)
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
    defalutValue,
    onClear
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
            onClear={onClear}
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
