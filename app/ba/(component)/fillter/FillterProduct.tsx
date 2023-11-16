"use client"
import { Input, theme } from "antd"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"
import Routers from "@/router/cusTomRouter"
import React from "react"
const FillterProduct: React.FC = () => {
    const router = useRouter()
    const {
        token: { colorPrimary }
    } = theme.useToken()

    return (
        <div>
            <div style={{ color: colorPrimary }} className="mb-[5px]">
                Tìm Kiếm
            </div>
            <Input />
        </div>
    )
}
export default FillterProduct
