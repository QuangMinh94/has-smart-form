"use client"
import React, { useTransition } from "react"
import { Input, Checkbox } from "antd"

import { useSearchParams, useRouter } from "next/navigation"
import { debounce } from "lodash"

const ActionHeaderRole = () => {
    const SearchParams = useSearchParams()
    const Router = useRouter()
    const checked = SearchParams.get("active")
    const searchname = SearchParams.get("searchname")
    const [loading, Transition] = useTransition()

    const HanderChecked = (e: any) => {
        Router.push(
            `?active=${e.target.checked}${
                !!searchname ? `&searchname=${searchname}` : ""
            } `
        )
    }

    const HanderSearch = debounce((e: any) => {
        const value = e.target.value
        Transition(() => {
            if (value) {
                Router.push(`?active=${checked}&searchname=${e.target.value}`)
            } else {
                Router.push(`?active=${checked}`)
            }
        })
    }, 400)

    return (
        <>
            <div className="flex-1">
                <Input.Search
                    className="InputCss"
                    placeholder="Tìm kiếm nhóm"
                    style={{ width: "30%", color: "red" }}
                    onChange={HanderSearch}
                    loading={loading}
                />
            </div>

            <div>
                <Checkbox
                    checked={checked === "true" || checked === null}
                    onChange={HanderChecked}
                >
                    Kích hoạt
                </Checkbox>
            </div>
        </>
    )
}
export default ActionHeaderRole
