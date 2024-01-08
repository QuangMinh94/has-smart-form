"use client"
import { integration, mappingTable } from "@/app/(types)/Connecter"
import { FecthIntergration } from "@/app/users/administrator/(component)/PopoverFindIntergaration"
import { useContextAdminAttachBu } from "@/components/cusTomHook/useContext"
import { ToFilterName } from "@/util/formatText"
import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Checkbox, Dropdown, Input, Spin, theme } from "antd"
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
const CustomdataDulicateConnnector = (data: integration[]) => {
    const obj: any = {}
    data.forEach((item) => {
        obj[item?.connection?._id] = true
    })

    return obj
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
    const [ItemMain, setItemsMain] = useState<TypeItem[]>([])
    const {
        token: { colorPrimary }
    } = theme.useToken()
    const { data, refetch, isRefetching, isLoading, error } = FecthIntergration(
        {
            request: { eProduct: EproductActive?._id ?? "" },
            key: EproductActive?._id ?? "",
            enabled: false
        }
    )

    const reSetDataMapping = () => {
        setDataGlobal((DataGlobal) => {
            return {
                ...DataGlobal,
                MappingTable: {
                    sourceParams: [],
                    targetParams: [],
                    dataType: []
                }
            }
        })
    }

    useEffect(() => {
        if (data) {
            const duplicateConnector = CustomdataDulicateConnnector(data)
            const connect = Connecter.map((item) => {
                const paperclip: boolean = !!duplicateConnector[item._id]
                const checked: boolean = paperclip || !!item?.checked
                return {
                    key: item._id ?? "",
                    label: (
                        <div
                            className="flex items-center"
                            onClick={() =>
                                onCheck({
                                    checked,
                                    id: item?._id ?? ""
                                })
                            }
                        >
                            <div className="flex-1">{item?.name}</div>
                            {duplicateConnector[item._id] && (
                                <FontAwesomeIcon
                                    style={{ marginRight: "5px" }}
                                    icon={faPaperclip}
                                />
                            )}
                            <Checkbox checked={checked} />
                        </div>
                    ),
                    checked,
                    name: item?.name ?? "",
                    paperclip
                }
            })
            connect.sort((a: any, b: any) => {
                if (a.paperclip && !b.paperclip) {
                    return -1
                }

                return 1
            })
            setItemsMain(connect)
            setitems(connect)
        }
    }, [JSON.stringify(Connecter), isRefetching, isLoading])
    useEffect(() => {
        if (data?.[0]?.mappingTable) {
            setDataGlobal((DataGlobal) => {
                const MappingTable: mappingTable = data?.[0]
                    ?.mappingTable as mappingTable
                return { ...DataGlobal, MappingTable }
            })
        } else {
            reSetDataMapping()
        }
    }, [isRefetching, isLoading])

    useEffect(() => {
        if (EproductActive?._id) {
            refetch()
        } else {
            reSetDataMapping()
        }
    }, [EproductActive?._id])

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
        const itemFilter = ItemMain.filter((item) => {
            return (
                item.checked ||
                (value
                    ? ToFilterName(item?.name).includes(ToFilterName(value))
                    : true)
            )
        })
        itemFilter.sort((a: any, b: any) => {
            if (a.paperclip && !b.paperclip) {
                return -1
            }

            return 1
        })

        setitems(itemFilter)
        // setOpen(itemFilter.length > 0)
    }, 300)
    const onCheck = ({ checked, id }: { checked: boolean; id: string }) => {
        setDataGlobal((data) => {
            const connecter = data.Connecter.map((item) => ({
                ...item,
                checked: item._id === id ? !checked : false
            }))
            // const index = connecter.findIndex((item) => item._id === id)
            // connecter.splice(index, 1, {
            //     ...connecter[index],
            //     checked: !checked
            // })
            return { ...data, Connecter: connecter }
        })
    }
    if (isLoading && EproductActive?._id) {
        return <Spin />
    }
    if (error) {
        return <div style={{ color: "red" }}>có lỗi, vui lòng thử lại sau</div>
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
                            Tìm Kiếm Connector
                        </div>
                        <Input
                            placeholder="Tìm kiếm Connector"
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
