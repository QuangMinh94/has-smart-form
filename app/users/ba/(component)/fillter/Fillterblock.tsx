"use client"
import FiliterOption from "@/app/users/(components)/filter/FilterTeamplate"
import Routers from "@/router/cusTomRouter"
import { Input, theme } from "antd"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"
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
            <div className="flex items-center">
                <Input.Search onChange={HandlerChange} loading={loading} />
                <div className="ml-[6px]">
                    <FiliterOption />
                </div>
            </div>
        </div>
    )
}
export default FillterBlock
