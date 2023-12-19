"use client"
import { Tree, Flex, theme } from "antd"
import type { DataNode } from "antd/es/tree"
import React, { useEffect } from "react"
import { eProduct, PermissionViewEproduct } from "@/app/(types)/eProduct"
import ButtonOpenModal from "../ButtonOpenModal"
import { useContextBa } from "@/components/cusTomHook/useContext"
import "./TreeViewProduct.css"

import { ToFilterName } from "@/util/formatText"
import { useSearchParams } from "next/navigation"

type TypeProps = {
    TreeEProduct: eProduct[]
    ViewPermissonEproduct: PermissionViewEproduct[]
}
function TreeCustom(
    Tree: eProduct[],
    searchValue: string,
    colorSeacrh: string,
    disabledActive?: boolean
): DataNode[] {
    const TreeCustomer: DataNode[] = []
    Tree.forEach((item) => {
        const strTitle = item?.name ?? ""
        const index = ToFilterName(strTitle).indexOf(ToFilterName(searchValue))
        const name =
            index > -1 && searchValue.length > 0 ? (
                <span style={{ color: colorSeacrh }}>{strTitle}</span>
            ) : (
                <span>{`${item?.name}`}</span>
            )

        TreeCustomer.push({
            title: (
                <Flex
                    className="boxAction"
                    style={item.active ? undefined : { opacity: "0.5" }}
                >
                    <div className="mr-[8px]">{name}</div>
                    <div
                        className="hidden actionHover"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <div className="mr-[8px]">
                            <ButtonOpenModal
                                rowData={item}
                                type="ADD_MODAL"
                                titleModal="Tạo nghiệp vụ"
                                typeRow="B"
                            />
                        </div>
                        <div className="mr-[8px]">
                            <ButtonOpenModal
                                rowData={item}
                                type="UPDATE_MODAL"
                                titleModal={
                                    item?.type === "P"
                                        ? "Cập nhật sản phẩm"
                                        : "Cập nhật nghiệp vụ"
                                }
                                typeRow={item?.type === "P" ? "P" : "B"}
                            />
                        </div>
                        <div>
                            <ButtonOpenModal
                                disabledActive={disabledActive}
                                rowData={item}
                                type="ACTIVE_MODAL"
                                titleModal={
                                    item.active
                                        ? `Vô hiệu hóa ${` ${
                                              item.type === "P"
                                                  ? "sản phẩm"
                                                  : "nghiệp vụ"
                                          } "${item.name}"`}`
                                        : `Khôi phục ${` ${
                                              item.type === "P"
                                                  ? "sản phẩm"
                                                  : "nghiệp vụ"
                                          } "${item.name}"`}`
                                }
                                typeRow="ACTIVE"
                            />
                        </div>
                    </div>
                </Flex>
            ),
            key: item?._id ?? "",
            children:
                item?.children && item?.children?.length > 0
                    ? TreeCustom(
                          item?.children ?? [],
                          searchValue,
                          colorSeacrh,
                          !item?.active || disabledActive
                      )
                    : [],
            icon: item?.name
        })
    })
    return TreeCustomer
}

function eProductsFilter({
    TreeEProducts,
    active
}: {
    TreeEProducts: eProduct[]
    active: boolean
}): eProduct[] {
    function eProductActive({
        eProduct
    }: {
        eProduct: eProduct[]
    }): eProduct[] {
        const eProducts: eProduct[] = []
        eProduct?.forEach((item) => {
            if (item.active) {
                eProducts.push({
                    ...item,
                    children:
                        item?.children && item?.children?.length > 0
                            ? eProductActive({ eProduct: item?.children })
                            : []
                })
            }
        })
        return eProducts
    }

    function eProductDeactive({
        eProduct
    }: {
        eProduct: eProduct[]
    }): eProduct[] {
        // const newEproducts: eProduct[] = []
        const eProducts: eProduct[] = []
        eProduct?.forEach((item) => {
            if (!item.active || checkDeActive(item?.children ?? [])) {
                eProducts.push({
                    ...item,
                    children:
                        item?.children && item?.children?.length > 0
                            ? eProductDeactive({ eProduct: item?.children })
                            : []
                })
            }
        })
        return eProducts
    }

    function checkDeActive(eProduct: eProduct[]): boolean {
        if (eProduct.length <= 0) {
            return false
        }
        return eProduct.some((item) => {
            if (!item.active) {
                return true
            }
            return checkDeActive(item?.children ?? [])
        })
    }

    if (active) {
        return eProductActive({ eProduct: TreeEProducts })
    }
    return eProductDeactive({
        eProduct: TreeEProducts
    })
}
const LayoutTreeView: React.FC<TypeProps> = ({
    TreeEProduct,
    ViewPermissonEproduct
}) => {
    console.log("ViewPermissonEproduct", ViewPermissonEproduct)
    const { dataGlobal, setDataGlobal, treeFilter, setTreeFilter } =
        useContextBa()
    const searchParams = useSearchParams()
    const { expandedKeys, searchValue, autoExpandParent } = treeFilter
    const {
        token: { colorPrimary }
    } = theme.useToken()

    const checked = searchParams.get("active") === "false" ? false : true

    useEffect(() => {
        if (dataGlobal.eProducts.length > 0) {
            const eproducts = eProductsFilter({
                TreeEProducts: dataGlobal.eProducts,
                active: checked
            })

            const dataTree = TreeCustom(eproducts, searchValue, colorPrimary)
            setDataGlobal((data) => ({
                ...data,
                DataNode: dataTree
            }))
        }
    }, [searchValue, checked, JSON.stringify(dataGlobal.eProducts)])

    useEffect(() => {
        setDataGlobal((data) => ({ ...data, eProducts: TreeEProduct }))
    }, [])
    console.log("data4", TreeEProduct)
    const onExpand = (newExpandedKeys: React.Key[]) => {
        setTreeFilter((data) => ({
            ...data,
            expandedKeys: newExpandedKeys,
            autoExpandParent: false
        }))
    }
    return (
        <Tree
            expandedKeys={expandedKeys}
            treeData={dataGlobal.DataNode}
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
        />
    )
}

export default LayoutTreeView
