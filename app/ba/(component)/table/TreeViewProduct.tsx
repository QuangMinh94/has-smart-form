"use client"
import { Tree, Flex } from "antd"
import type { DataNode } from "antd/es/tree"
import React, { useState, useMemo } from "react"
import { eProduct } from "@/app/(types)/eProduct"
import ButtonOpenModal from "../ButtonOpenModal"
import "./TreeViewProduct.css"
type TypeProps = {
    TreeEProduct: eProduct[]
}
function TreeCustom(Tree: eProduct[]): DataNode[] {
    const TreeCustomer: DataNode[] = []
    Tree.forEach((item) => {
        TreeCustomer.push({
            title: (
                <Flex className="boxAction">
                    <div className="mr-[8px]">{item?.name}</div>
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
                                titleModal="Tạo mới sản phẩm"
                            />
                        </div>
                        <div>
                            <ButtonOpenModal
                                rowData={item}
                                type="UPDATE_MODAL"
                                titleModal="Cập nhật sản phẩm"
                            />
                        </div>
                    </div>
                </Flex>
            ),

            key: item?._id ?? "",
            children:
                item?.children && item?.children?.length > 0
                    ? TreeCustom(item?.children ?? [])
                    : []
        })
    })
    return TreeCustomer
}
const LayoutTreeView: React.FC<TypeProps> = ({ TreeEProduct }) => {
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false)
    const Treecustom = useMemo(() => {
        return TreeCustom(TreeEProduct)
    }, [TreeEProduct.length])
    return (
        <Tree
            //   expandedKeys={expandedKeys}
            treeData={Treecustom}
            // onExpand={onExpand}
            autoExpandParent={autoExpandParent}
        />
    )
}

export default LayoutTreeView
