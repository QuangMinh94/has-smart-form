"use client"
import React, { memo } from "react"
import { Checkbox } from "antd"

// import { useSearchParams, useRouter } from "next/navigation"
import FilterTree from "../TreeCustome/FillterTree"

const ActionHeaderByTree = () => {
    // const SearchParams = useSearchParams()
    // const Router = useRouter()
    // const checked = SearchParams.get("active")

    // const HanderChecked = (e: any) => {
    //     Router.push(`?active=${e.target.checked}`)
    // }

    return (
        <>
            <div className="flex-1">
                <div className="w-[30%]">
                    <FilterTree />
                </div>
            </div>

            <div>
                {/* <Checkbox
                    checked={checked === "true" || checked === null}
                    onChange={HanderChecked}
                >
                    Kích hoạt
                </Checkbox> */}
            </div>
        </>
    )
}
export default memo(ActionHeaderByTree)
