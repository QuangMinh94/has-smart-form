"use client"
import { Tree, Flex, theme } from "antd"
import type { DataNode } from "antd/es/tree"
import React, { useMemo, useEffect } from "react"
import { eProduct } from "@/app/(types)/eProduct"
import ButtonOpenModal from "../ButtonOpenModal"
import { useContextBa } from "@/components/cusTomHook/useContext"
import "./TreeViewProduct.css"

import { ToFilterName } from "@/util/formatText"
type TypeProps = {
    TreeEProduct: eProduct[]
}
function TreeCustom(
    Tree: eProduct[],
    searchValue: string,
    colorSeacrh: string
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
                <Flex className="boxAction">
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
                        <div>
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
                    </div>
                </Flex>
            ),
            key: item?._id ?? "",
            children:
                item?.children && item?.children?.length > 0
                    ? TreeCustom(item?.children ?? [], searchValue, colorSeacrh)
                    : [],
            icon: item?.name
        })
    })
    return TreeCustomer
}

const LayoutTreeView: React.FC<TypeProps> = ({ TreeEProduct }) => {
    const { dataGlobal, setDataGlobal, treeFilter, setTreeFilter } =
        useContextBa()
    const { expandedKeys, searchValue, autoExpandParent } = treeFilter
    const {
        token: { colorPrimary }
    } = theme.useToken()

    const Treecustom = useMemo(() => {
        const dataTree = TreeCustom(
            dataGlobal.eProducts,
            searchValue,
            colorPrimary
        )
        setDataGlobal((data) => ({ ...data, DataNode: dataTree }))
        return dataTree
    }, [JSON.stringify(dataGlobal.eProducts), searchValue])

    useEffect(() => {
        setDataGlobal((data) => ({ ...data, eProducts: TreeEProduct }))
    }, [TreeEProduct.length])
    console.log("data", TreeEProduct)
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
            treeData={Treecustom}
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
        />
    )
}

export default LayoutTreeView
