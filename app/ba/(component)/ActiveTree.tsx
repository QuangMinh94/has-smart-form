"use client"
import { Spin } from "antd"
import React, { memo, useTransition } from "react"
import { Checkbox } from "antd"
import { useSearchParams, useRouter } from "next/navigation"

const ActiveTree: React.FC = () => {
    const [loading, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const router = useRouter()
    const checked = searchParams.get("active") === "false" ? false : true
    const HandelerOnChange = (e: any) => {
        startTransition(() => {
            const checked = e.target.checked
            router.push(`?active=${checked}`)
        })
    }
    return (
        <div className="flex items-center">
            {loading && (
                <Spin style={{ marginRight: "5px" }} size="small"></Spin>
            )}
            <Checkbox onChange={HandelerOnChange} checked={checked}>
                Hoạt động
            </Checkbox>
        </div>
    )
}
export default memo(ActiveTree)
