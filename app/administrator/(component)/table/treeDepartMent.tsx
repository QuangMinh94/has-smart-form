"use client"
import { Tree, Flex, theme } from "antd"
import type { DataNode } from "antd/es/tree"
import React, { useEffect, useState } from "react"
import { Department } from "@/app/(types)/Department"
import ButtonModal from "@/app/administrator/(component)/BtnModal"
import { useContextTree } from "@/components/cusTomHook/useContext"

import TreeCustom from "../TreeCustome/CustomTree"
type TypeProps = {
    Department: Department[]
}

const AddModalComponent: React.FC<{
    datarow: any
}> = ({ datarow }) => {
    return (
        <ButtonModal
            iconBtn={true}
            type="ADD_MODAL"
            titleModel="Thêm đơn vị"
            rowData={datarow}
            pathModel="ADMIN_DEPARTMENT"
        />
    )
}
const UpdateModalComponent: React.FC<{
    datarow: any
}> = ({ datarow }) => {
    return (
        <ButtonModal
            type="UPDATE_MODAL"
            titleModel="Sửa đơn vị"
            rowData={datarow}
            pathModel="ADMIN_DEPARTMENT"
        />
    )
}
const LayoutTreeView: React.FC<TypeProps> = ({ Department }) => {
    const { dataGlobal, setDataGlobal, treeFilter, setTreeFilter } =
        useContextTree()
    const { expandedKeys, searchValue, autoExpandParent } = treeFilter
    const {
        token: { colorPrimary }
    } = theme.useToken()
    useEffect(() => {
        const dataTree = TreeCustom({
            Tree: Department,
            searchValue,
            colorSeacrh: colorPrimary,
            AddModel: AddModalComponent,
            UpdateModel: UpdateModalComponent
        })

        setDataGlobal((data) => ({ ...data, DataNode: dataTree }))
    }, [JSON.stringify(Department), searchValue])

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setTreeFilter((data) => ({
            ...data,
            expandedKeys: newExpandedKeys,
            autoExpandParent: false
        }))
    }
    return (
        <Tree
            style={{ maxHeight: "70vh", overflowY: "auto" }}
            expandedKeys={expandedKeys}
            treeData={dataGlobal.DataNode}
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
        />
    )
}

export default LayoutTreeView
