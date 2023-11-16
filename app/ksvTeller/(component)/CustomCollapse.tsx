"use client"
import React, { useMemo } from "react"
import { GetProductTree } from "@/app/(service)/eProduct"
import { useQuery } from "@tanstack/react-query"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { eProduct, formTemplate } from "@/app/(types)/eProduct"
import { Spin, Collapse } from "antd"
import type { CollapseProps } from "antd"

// const UseFecthApi = () => {
//     const { token, session } = useCustomCookies()
//     const { isLoading, error, data } = useQuery<eProduct[]>({
//         queryKey: ["repoData"],
//         queryFn: async () => {
//             const res = await GetProductTree({
//                 bodyRequest: {},
//                 token,
//                 session
//             })
//             return res.data
//         },
//         retry: 3,
//         refetchOnWindowFocus: false,
//         refetchOnReconnect: false
//     })

//     return { isLoading, error, data }
// }
type Props = { formTemplate: formTemplate[] }
const CollapseCustom: React.FC<Props> = ({ formTemplate }) => {
    // const { data, isLoading } = UseFecthApi()

    // const items = useMemo(() => {
    //     const FormTemplateObj: any = formTemplate.reduce((acc: any, item) => {
    //         acc[`${item._id}`] = item
    //         return acc
    //     }, {})

    //     function Items(
    //         dataCustom: eProduct[],
    //         ObjCheck: any
    //     ): CollapseProps["items"] {
    //         const items: CollapseProps["items"] = []
    //         dataCustom.forEach((item) => {
    //             const itemsData: CollapseProps["items"] = []

    //             item?.children?.forEach((children) => {
    //                 const itemFormTemplate: CollapseProps["items"] = []
    //                 children.formTemplate?.forEach((formTemplate) => {
    //                     if (ObjCheck[`${formTemplate._id}`]) {
    //                         itemFormTemplate.push({
    //                             key: formTemplate._id,
    //                             label: formTemplate.name
    //                         })
    //                     }
    //                 })
    //                 if (itemFormTemplate.length > 0) {
    //                     itemsData.unshift({
    //                         key: children?._id,
    //                         label: children.name,
    //                         children: (
    //                             <ul>
    //                                 {itemFormTemplate.map((item, index) => {
    //                                     const length =
    //                                         itemFormTemplate.length - 1
    //                                     return (
    //                                         <li
    //                                             className={`${
    //                                                 index > 0 && index < length
    //                                                     ? "my-[14px]"
    //                                                     : ""
    //                                             }`}
    //                                             key={item.key}
    //                                         >
    //                                             {item?.label}
    //                                         </li>
    //                                     )
    //                                 })}
    //                             </ul>
    //                         )
    //                     })
    //                 }
    //             })
    //             if (itemsData.length > 0) {
    //                 items.unshift({
    //                     key: item._id,
    //                     label: item.name,
    //                     children: <Collapse items={itemsData} />
    //                 })
    //             }
    //         })
    //         return items
    //     }
    //     if (data?.length && data?.length > 0) {
    //         return Items(data, FormTemplateObj) ?? []
    //     }
    //     return []
    // }, [data?.length])

    return (
        <div className="mt-[14px]">
            {/* {isLoading ? <Spin /> : <Collapse items={items} />} */}
        </div>
    )
}
export default CollapseCustom
