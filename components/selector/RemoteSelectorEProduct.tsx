"use client"

import { eProduct } from "@/app/(types)/eProduct"
import { ToLowerCaseNonAccentVietnamese } from "@/util/formatText"
import { Select, Spin } from "antd"
import type { SelectProps } from "antd/es/select"
import axios from "axios"
import debounce from "lodash/debounce"
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import QueriesContext from "../context/queriesContext"

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
    fetchOptions: (search: string) => Promise<ValueType[]>
    debounceTimeout?: number
}

function DebounceSelect<
    ValueType extends {
        key?: string
        label: React.ReactNode
        value: string | number
    } = any
>({
    fetchOptions,
    debounceTimeout = 800,
    ...props
}: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState<ValueType[]>([])
    const fetchRef = useRef(0)

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1
            const fetchId = fetchRef.current
            setOptions([])
            setFetching(true)

            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return
                }

                setOptions(newOptions)
                setFetching(false)
            })
        }

        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (
        <Select
            labelInValue
            filterOption={false}
            onFocus={() => debounceFetcher("")}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    )
}

// Usage of DebounceSelect
interface UserValue {
    label: string
    value: string
}

async function fetchProduct(
    searchString: string,
    url: string,
    header: any
): Promise<any[]> {
    return axios
        .post(url, {}, { headers: header })
        .then((response) => response.data as eProduct[])
        .then((body) =>
            body
                .filter((element) =>
                    ToLowerCaseNonAccentVietnamese(
                        element?.name ?? ""
                    ).includes(ToLowerCaseNonAccentVietnamese(searchString))
                )
                .map((element) => ({
                    label: element.name,
                    value: element._id!
                }))
        )
}

const RemoteSelectorEProduct = ({
    url,
    header,
    initValue
}: {
    url: string
    header: any
    initValue: any[]
}) => {
    const [value, setValue] = useState<UserValue[]>(initValue)
    useEffect(() => {
        setValue(initValue)
    }, [JSON.stringify(initValue)])

    const { setEProduct } = useContext(QueriesContext)
    const onChange = (element: UserValue[]) => {
        //const idList: string[] = []
        //element.forEach((e) => idList.push(e.value))
        if (element.length > 0) {
            setEProduct(btoa(encodeURIComponent(JSON.stringify(element))))
        } else {
            setEProduct("")
        }
    }

    return (
        <DebounceSelect
            allowClear
            mode="multiple"
            value={value}
            placeholder="Chọn sản phẩm"
            fetchOptions={(e) => fetchProduct(e, url, header)}
            onChange={(newValue) => {
                setValue(newValue as UserValue[])
                onChange(newValue as UserValue[])
            }}
            style={{ width: "100%" }}
        />
    )
}

export default RemoteSelectorEProduct
