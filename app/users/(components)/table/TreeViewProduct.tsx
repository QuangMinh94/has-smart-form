"use client"
import { PermissionViewEproduct, eProduct } from "@/app/(types)/eProduct"
import { useContextBa } from "@/components/cusTomHook/useContext"
import { Flex, Tree, theme } from "antd"
import type { DataNode } from "antd/es/tree"
import React, { useEffect } from "react"
import ButtonOpenModal from "../button/ButtonOpenModalProduct"
import "./TreeViewProduct.css"

import { ToFilterName } from "@/util/formatText"
import { useSearchParams } from "next/navigation"

type TypeProps = {
    TreeEProduct: eProduct[]
    ViewPermissonEproduct: PermissionViewEproduct
}
interface btnConditions {
    add: {
        title: string
        disable: boolean
        type: "P" | "B"
    }
    update: {
        title: string
        disable: boolean
        type: "P" | "B"
    }
    active: {
        title: string
        disable: boolean
        type: "ACTIVE"
    }
}
function TreeCustom({
    Tree,
    searchValue,
    colorSeacrh,
    viewPermissonEproduct
}: {
    Tree: eProduct[]
    searchValue: string
    colorSeacrh: string
    viewPermissonEproduct: PermissionViewEproduct
}): DataNode[] {
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

        const permissions = viewPermissonEproduct?.ruleArray?.find(
            (permisson) => permisson.productId === item._id
        )

        const conditionsBtn: btnConditions = {
            add: {
                title: "Tạo nghiệp vụ",
                disable: !permissions?.value?.visibleAddBusiness,
                type: "B"
            },
            update: {
                title:
                    item.type === "B"
                        ? "Cập nhật nghiệp vụ"
                        : "Cập nhậ sản phẩm",
                disable: !!(
                    !permissions?.value?.visibleEditBusiness &&
                    !permissions?.value?.visibleEditProduct
                ),
                type: item.type === "B" ? "B" : "P"
            },
            active: {
                title: item.active
                    ? `Vô hiệu hóa ${` ${
                          item.type === "P" ? "sản phẩm" : "nghiệp vụ"
                      } "${item.name}"`}`
                    : `Khôi phục ${` ${
                          item.type === "P" ? "sản phẩm" : "nghiệp vụ"
                      } "${item.name}"`}`,
                disable: !!(
                    !permissions?.value?.visibleDeactiveProduct &&
                    !permissions?.value?.visibleDeactiveBusiness
                ),
                type: "ACTIVE"
            }
        }

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
                                titleModal={conditionsBtn.add.title}
                                typeRow={conditionsBtn.add.type}
                                disabled={conditionsBtn.add.disable}
                            />
                        </div>
                        <div className="mr-[8px]">
                            <ButtonOpenModal
                                rowData={item}
                                type="UPDATE_MODAL"
                                titleModal={conditionsBtn.update.title}
                                typeRow={conditionsBtn.update.type}
                                disabled={conditionsBtn.update.disable}
                            />
                        </div>
                        <div>
                            <ButtonOpenModal
                                disabled={conditionsBtn.active.disable}
                                rowData={item}
                                type="ACTIVE_MODAL"
                                titleModal={conditionsBtn.active.title}
                                typeRow={conditionsBtn.active.type}
                            />
                        </div>
                    </div>
                </Flex>
            ),
            key: item?._id ?? "",
            children:
                item?.children && item?.children?.length > 0
                    ? TreeCustom({
                          Tree: item?.children ?? [],
                          searchValue,
                          colorSeacrh,
                          viewPermissonEproduct
                      })
                    : [],
            icon: item?.name
        })
    })
    return TreeCustomer
}

const LayoutTreeView: React.FC<TypeProps> = ({
    TreeEProduct,
    ViewPermissonEproduct
}) => {
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
            const dataTree = TreeCustom({
                Tree: dataGlobal.eProducts,
                searchValue,
                colorSeacrh: colorPrimary,
                viewPermissonEproduct: ViewPermissonEproduct
            })
            setDataGlobal((data) => ({
                ...data,
                DataNode: dataTree
            }))
        }
    }, [searchValue, JSON.stringify(dataGlobal.eProducts)])

    useEffect(() => {
        setDataGlobal((data) => ({ ...data, eProducts: TreeEProduct }))
    }, [checked, JSON.stringify(TreeEProduct)])

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setTreeFilter((data) => ({
            ...data,
            expandedKeys: newExpandedKeys,
            autoExpandParent: false
        }))
    }
    return (
        <Tree
            style={{ height: "70vh", overflow: "auto" }}
            expandedKeys={expandedKeys}
            treeData={dataGlobal.DataNode}
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
        />
    )
}

export default LayoutTreeView
