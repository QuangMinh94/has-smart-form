"use client"
import { useContextBa } from "@/components/cusTomHook/useContext"
import React, { memo } from "react"
import { Checkbox } from "antd"
import { eProduct } from "@/app/(types)/eProduct"

const ActiveTree: React.FC = () => {
    const { setDataGlobal } = useContextBa()

    const HandelerOnChange = (e: any) => {
        const checked = e.target.checked
        // setDataGlobal((data) => {
        //     const eProducts = [...data.eProducts]
        //     const eProductsCustome: eProduct[] = []
        //     const check: { active: boolean } = { active: true }
        //     function eProductDeactive(
        //         eProduct: eProduct[],
        //         check: { active: boolean }
        //     ) {
        //         eProduct.forEach((item, index) => {
        //             check.active === !!item.active

        //             // if (!check) {
        //             //     item.children = []
        //             // }
        //             if (item?.children && item?.children?.length > 0) {
        //                 eProductDeactive(item?.children ?? [], check)
        //             }

        //             if (check.active) {
        //                 eProductsCustome.push(item)
        //             }
        //         })
        //     }
        //     eProductDeactive(eProducts, check)
        //     return {
        //         ...data,
        //         eProducts: checked ? eProducts : eProductsCustome
        //     }
        // })
    }
    return <Checkbox onChange={HandelerOnChange} />
}
export default memo(ActiveTree)
