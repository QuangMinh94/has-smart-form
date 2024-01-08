"use client"
import FiliterOption, {
    params,
    useCustomeSearchParamsFilter
} from "@/app/users/(components)/filter/FilterTeamplate"
import { Input, theme } from "antd"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"
import React, { useTransition } from "react"
const FillterBlock: React.FC = () => {
    const [loading, Transition] = useTransition()
    const { creator, approved, status, major, timecreate, timeend } =
        useCustomeSearchParamsFilter()

    const router = useRouter()
    const {
        token: { colorPrimary }
    } = theme.useToken()
    const HandlerChange = debounce((e) => {
        Transition(() => {
            router.push(
                params({
                    creator,
                    approved,
                    status,
                    major,
                    timecreate,
                    timeend,
                    name: e?.target?.value ?? ""
                })
            )
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
