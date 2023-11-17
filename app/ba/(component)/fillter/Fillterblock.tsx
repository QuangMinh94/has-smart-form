"use client"
import { Input, theme } from "antd"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"
import Routers from "@/router/cusTomRouter"
import React from "react"
const FillterBlock: React.FC = () => {
    const router = useRouter()
    const {
        token: { colorPrimary }
    } = theme.useToken()
    const HandlerChange = debounce((e) => {
        if (e.target.value) {
            router.push(`?name=${e.target.value}`)
        } else {
            router.push(Routers("ba").block.path)
        }
    }, 400)
    return (
        <div>
            <div style={{ color: colorPrimary }} className="mb-[5px]">
                Tìm Kiếm
            </div>
            <Input onChange={HandlerChange} />
        </div>
    )
}
export default FillterBlock
