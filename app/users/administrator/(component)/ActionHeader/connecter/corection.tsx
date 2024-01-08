"use client"
import { useContextAdminAttachBu } from "@/components/cusTomHook/useContext"
import { Input } from "antd"
import { debounce } from "lodash"
import { memo, useTransition } from "react"
const ActionHeaderManager = () => {
    const [loading, Transition] = useTransition()
    const { setFillterCorrection, FillterCorrection } =
        useContextAdminAttachBu()

    const HanderSearch = debounce((e: any) => {
        const value = e.target.value
        Transition(() => {
            setFillterCorrection(value)
        })
    }, 400)

    return (
        <Input.Search
            // value={FillterCorrection}
            className="InputCss"
            placeholder="Tìm kiếm"
            style={{ width: "30%" }}
            onChange={HanderSearch}
            loading={loading}
        />
    )
}
export default memo(ActionHeaderManager)
