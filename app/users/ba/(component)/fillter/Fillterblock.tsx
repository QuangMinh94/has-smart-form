"use client"
import { Input, theme } from "antd"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"
import Routers from "@/router/cusTomRouter"
import React, { useTransition } from "react"
const FillterBlock: React.FC = () => {
    const [loading, Transition] = useTransition()
    const router = useRouter()
    const {
        token: { colorPrimary }
    } = theme.useToken()
    const HandlerChange = debounce((e) => {
        Transition(() => {
            if (e.target.value) {
                router.push(`?name=${e.target.value}`)
            } else {
                router.push(Routers("ba").block.path)
            }
        })
    }, 400)
    return (
        <div>
            <div style={{ color: colorPrimary }} className="mb-[5px]">
                Tìm Kiếm
            </div>
            <Input.Search onChange={HandlerChange} loading={loading} />
        </div>
    )
}
export default FillterBlock
