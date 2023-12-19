"use client"
import Uploadfile from "@/app/users/administrator/(component)/ActionHeader/DropDowLoadFile"
import { Checkbox, Input } from "antd"
import { debounce } from "lodash"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

const ActionHeaderUser = () => {
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
                Router.push(
                    `?active=${checked === null ? true : checked}&searchname=${
                        e.target.value
                    }`
                )
            } else {
                Router.push(`?active=${checked}`)
            }
        })
    }, 400)
    console.log("d", checked)
    return (
        <>
            <div className="flex-1">
                <Input.Search
                    className="InputCss"
                    placeholder="Tìm kiếm người dùng"
                    style={{ width: "30%", color: "red" }}
                    onChange={HanderSearch}
                    loading={loading}
                />
            </div>
            <div className="mr-[10px]">
                <Uploadfile />
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
export default ActionHeaderUser
