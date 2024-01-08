"use client"

import {
    useContextAdminAttachBu,
    useContextTree
} from "@/components/cusTomHook/useContext"
import { Checkbox, Tree, theme } from "antd"
import React, { useEffect } from "react"
import TreeCustomer, {
    updateCheckbox
} from "../../TreeCustome/CustomTreeAttachBusiness"

const ChecBoxComponent: React.FC<{
    id: string
    checked: boolean
}> = ({ id, checked }) => {
    const { setDataGlobal } = useContextAdminAttachBu()
    const onCheck = () => {
        setDataGlobal((data) => {
            const Eproduct = data.Eproduct
            updateCheckbox({ eProduct: Eproduct, checked, id })
            return { ...data, Eproduct: Eproduct }
        })
    }
    return <Checkbox checked={checked} onChange={onCheck} />
}

const TreeGroup: React.FC = () => {
    const providerAttachBu = useContextAdminAttachBu()

    const { dataGlobal, setDataGlobal, treeFilter, setTreeFilter } =
        useContextTree()
    const { expandedKeys, searchValue, autoExpandParent } = treeFilter
    const {
        token: { colorPrimary }
    } = theme.useToken()
    useEffect(() => {
        const dataTree = TreeCustomer({
            Tree: providerAttachBu.dataGlobal.Eproduct,
            searchValue,
            Checkbox: ChecBoxComponent
        })
        setDataGlobal((data) => ({ ...data, DataNode: dataTree }))
    }, [JSON.stringify(providerAttachBu.dataGlobal.Eproduct), searchValue])

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setTreeFilter((data) => ({
            ...data,
            expandedKeys: newExpandedKeys,
            autoExpandParent: false
        }))
    }

    return (
        <Tree
            style={{ maxHeight: "60vh", width: "45%", overflowY: "auto" }}
            expandedKeys={expandedKeys}
            treeData={dataGlobal.DataNode}
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
        />
    )
}

export default TreeGroup
