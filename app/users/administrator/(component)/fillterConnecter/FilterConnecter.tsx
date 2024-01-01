"use client"
import { useContextAdminAttachBu } from "@/components/cusTomHook/useContext"
import { ToFilterName } from "@/util/formatText"
import { Checkbox, Dropdown, Input, theme } from "antd"
import { debounce } from "lodash"
import React, { memo, useEffect, useState } from "react"
import { CustomEproduct } from "../TreeCustome/CustomTreeAttachBusiness"
import "./CssFilter.css"
const HanderflatEproduct = ({
    Eproduct,
    EproductFlat
}: {
    Eproduct: CustomEproduct[]
    EproductFlat: CustomEproduct[]
}) => {
    Eproduct.forEach((product) => {
        if (product.type === "B") {
            EproductFlat.push(product)
        }
        if (product.children && product.children.length > 0) {
            HanderflatEproduct({
                Eproduct: product.children,
                EproductFlat: EproductFlat
            })
        }
    })
}

const EproductsFLat = (Eproduct: CustomEproduct[]): CustomEproduct[] => {
    const EproductFlat: CustomEproduct[] = []
    HanderflatEproduct({ Eproduct, EproductFlat })
    return EproductFlat
}
const getEproductChecked = (
    Eproduct: CustomEproduct[]
): Partial<CustomEproduct> | undefined => {
    let result: Partial<CustomEproduct> | undefined = undefined
    for (let i = 0; i < Eproduct.length; i++) {
        const item = Eproduct[i]
        if (item.checked === true) {
            return item
        }
        if (item?.children && item.children.length > 0) {
            result = getEproductChecked(item.children)
            if (result) {
                return result
            }
        }
    }
    return result
}

type TypeItem = {
    key: string
    label: React.ReactElement
    checked: boolean
    name: string
}
const FilterConnecter: React.FC = () => {
    const {
        tab,
        setIdEproductActive,
        EproductActive,
        setDataGlobal,
        dataGlobal: { Connecter, Eproduct }
    } = useContextAdminAttachBu()
    const [open, setOpen] = useState<boolean>(false)
    const [items, setitems] = useState<TypeItem[]>([])
    const [value, setvalue] = useState<string>("")
    const {
        token: { colorPrimary }
    } = theme.useToken()

    useEffect(() => {
        console.log("data", EproductActive)
        console.log("Connecter", Connecter)
        const connect = Connecter.map((item) => ({
            key: item._id ?? "",
            label: (
                <div
                    className="flex"
                    onClick={() =>
                        onCheck({
                            check: !!item?.checked,
                            id: item?._id ?? ""
                        })
                    }
                >
                    <div className="flex-1">{item?.name}</div>
                    <Checkbox checked={!!item?.checked} />
                </div>
            ),
            checked: !!item.checked,
            name: item?.name ?? ""
        }))
        setitems(connect)
    }, [JSON.stringify(Connecter), EproductActive?._id])

    useEffect(() => {
        const activeProduct = getEproductChecked(Eproduct)
        setIdEproductActive(activeProduct ?? {})
        if (activeProduct) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [JSON.stringify(Eproduct)])

    const onChange = debounce((e: any) => {
        const value = e.target.value
        const itemFilter = items.filter((item) => {
            return (
                item.checked ||
                (value
                    ? ToFilterName(item?.name).includes(ToFilterName(value))
                    : true)
            )
        })
        itemFilter.sort((a: any, b: any) => {
            if (a.checked && !b.checked) {
                return -1
            }

            return 1
        })
        setvalue(value)
        setitems(itemFilter)
        // setOpen(itemFilter.length > 0)
    }, 300)
    const onCheck = ({ check, id }: { check: boolean; id: string }) => {
        setDataGlobal((data) => {
            const connecter = data.Connecter
            const index = connecter.findIndex((item) => item._id === id)
            connecter.splice(index, 1, { ...connecter[index], checked: !check })
            return { ...data, Connecter: connecter }
        })
    }
    return (
        <>
            {tab === "ADMIN_ATTACH_BUSINESS" && (
                <Dropdown menu={{ items }} open={open} placement="bottom">
                    <div className="w-[100%]">
                        <div
                            style={{ color: colorPrimary }}
                            className="mb-[5px]"
                        >
                            Tìm Kiếm Connecter
                        </div>
                        <Input
                            placeholder="Tìm kiếm Connecter"
                            onChange={onChange}
                            style={{ height: "33px", width: "100%" }}
                        />
                    </div>
                </Dropdown>
            )}
        </>
    )
}
export default memo(FilterConnecter)
