"use client"
import { Tree } from "antd"
import type { DataNode } from "antd/es/tree"
import React, { useState } from "react"
import { eProduct } from "@/app/(types)/eProduct"
type TypeProps = {
    TreeEProduct: eProduct[]
}
const LayoutTreeView: React.FC<TypeProps> = ({ TreeEProduct }) => {
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false)
    console.log("ok", TreeEProduct)
    function TreeCustom(Tree: eProduct[]): DataNode[] {
        const TreeCustomer: DataNode[] = []
        Tree.forEach((item) => {
            TreeCustomer.push({
                title: item?.name ?? "",
                key: item?._id ?? "",
                children:
                    item?.children && item?.children?.length > 0
                        ? TreeCustom(item?.children ?? [])
                        : []
            })
        })
        return TreeCustomer
    }
    const Treecustom = TreeCustom(TreeEProduct)

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
