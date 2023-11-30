"use client"

import { Category, CategoryTypes } from "@/app/(types)/Categories"
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

async function fetchCategories(
    searchString: string,
    url: string,
    type: string,
    header: any
): Promise<UserValue[]> {
    return axios
        .post(
            url,
            searchString !== ""
                ? { type: type, name: searchString }
                : { type: type },
            { headers: header }
        )
        .then((response) => response.data as Category[])
        .then((body) =>
            body.map((element) => ({
                label: element.name,
                value: element._id
            }))
        )
}

const RemoteSelectorCategory = ({
    type,
    url,
    header,
    initValue
}: {
    type: string
    url: string
    header: any
    initValue: any[]
}) => {
    const [value, setValue] = useState<UserValue[]>(initValue)

    useEffect(() => {
        setValue(initValue)
    }, [JSON.stringify(initValue)])

    const { setChannel, setStatus } = useContext(QueriesContext)
    const onChange = (element: UserValue[]) => {
        //const idList: string[] = []
        //element.forEach((e) => idList.push(e.value))
        if (type === CategoryTypes.CHANNEL) {
            setChannel(btoa(encodeURIComponent(JSON.stringify(element))))
        } else {
            setStatus(btoa(encodeURIComponent(JSON.stringify(element))))
        }
    }

    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Chọn"
            fetchOptions={(e) => fetchCategories(e, url, type, header)}
            onChange={(newValue) => {
                setValue(newValue as UserValue[])
                onChange(newValue as UserValue[])
            }}
            style={{ width: "100%" }}
        />
    )
}

export default RemoteSelectorCategory
