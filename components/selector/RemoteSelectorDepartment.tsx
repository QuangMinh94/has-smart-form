"use client"

import { Department } from "@/app/(types)/Department"
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

async function fetchDepartment(
    searchString: string,
    url: string,
    header: any
): Promise<UserValue[]> {
    return axios
        .get(url, { headers: header })
        .then((response) => response.data as Department[])
        .then((body) =>
            body
                .filter((element) =>
                    ToLowerCaseNonAccentVietnamese(element.name).includes(
                        ToLowerCaseNonAccentVietnamese(searchString)
                    )
                )
                .map((element) => ({
                    label: element.name,
                    value: element._id!
                }))
        )
}

const RemoteSelectorDepartment = ({
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

    const { setOfficeBranch } = useContext(QueriesContext)
    const onChange = (element: UserValue[]) => {
        //const idList: string[] = []
        //element.forEach((e) => idList.push(e.value))
        setOfficeBranch(btoa(encodeURIComponent(JSON.stringify(element))))
    }

    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Chọn"
            fetchOptions={(e) => fetchDepartment(e, url, header)}
            onChange={(newValue) => {
                setValue(newValue as UserValue[])
                onChange(newValue as UserValue[])
            }}
            style={{ width: "100%" }}
        />
    )
}

export default RemoteSelectorDepartment
