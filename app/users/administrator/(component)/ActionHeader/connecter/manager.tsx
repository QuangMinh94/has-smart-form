"use client"
import ButtonModal from "@/app/users/administrator/(component)/BtnModal"
import { Checkbox, Input } from "antd"
import { debounce } from "lodash"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
const ActionHeaderManager = () => {
    const SearchParams = useSearchParams()
    const Router = useRouter()
    const checked = SearchParams.get("active")
    const searchname = SearchParams.get("name")
    const [loading, Transition] = useTransition()

    const HanderChecked = (e: any) => {
        const query = new URLSearchParams()
        query.set("active", e?.target?.checked)
        if (searchname) {
            query.set("name", searchname)
        } else {
            query.delete("name")
        }

        Router.push(`?${query}`)
    }

    const HanderSearch = debounce((e: any) => {
        const value = e.target.value
        Transition(() => {
            const query = new URLSearchParams()
            query.set("active", checked === null ? "true" : `${checked}`)
            if (value) {
                query.set("name", encodeURIComponent(e.target.value))
                Router.push(`?${query}`)
            } else {
                query.delete("name")
                Router.push(`?${query}`)
            }
        })
    }, 400)

    return (
        <>
            <div className="flex-1">
                <Input.Search
                    className="InputCss"
                    placeholder="Tìm kiếm Connecter"
                    style={{ width: "30%" }}
                    onChange={HanderSearch}
                    loading={loading}
                />
            </div>
            <Checkbox
                style={{ marginRight: "10px" }}
                onChange={HanderChecked}
                checked={checked === "false" ? false : true}
            />
            <ButtonModal
                type="CATEGORY_CONNECTION"
                pathModel="ADMIN_CONNECTER_MANAGER"
                titleModel="Loại kết nối"
                rowData={{}}
            />
        </>
    )
}
export default ActionHeaderManager
