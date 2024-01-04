"use client"
import { useContextAdminAttachBu } from "@/components/cusTomHook/useContext"
import { Input } from "antd"
import { memo, useTransition } from "react"
const ActionHeaderManager = () => {
    const [loading, Transition] = useTransition()
    const { setFillterCorrection, FillterCorrection } =
        useContextAdminAttachBu()

    const HanderSearch = (e: any) => {
        const value = e.target.value
        Transition(() => {
            setFillterCorrection(value)
        })
    }

    return (
        <Input.Search
            value={FillterCorrection}
            className="InputCss"
            placeholder="Tìm kiếm"
            style={{ width: "30%" }}
            onChange={HanderSearch}
            loading={loading}
        />
    )
}
export default memo(ActionHeaderManager)
