"use client"
import { Group } from "@/app/(types)/Group"
import ButtonModal from "@/app/users/administrator/(component)/BtnModal"
import { useContextTree } from "@/components/cusTomHook/useContext"
import { Tree, theme } from "antd"
import React, { useEffect } from "react"

import TreeCustom from "../TreeCustome/CustomTree"
type TypeProps = {
    Group: Group[]
}

const AddModalComponent: React.FC<{
    datarow: any
}> = ({ datarow }) => {
    return (
        <ButtonModal
            iconBtn={true}
            type="ADD_MODAL"
            titleModel="Thêm nhóm"
            rowData={datarow}
            pathModel="ADMIN_GROUP"
        />
    )
}
const UpdateModalComponent: React.FC<{
    datarow: any
}> = ({ datarow }) => {
    return (
        <ButtonModal
            type="UPDATE_MODAL"
            titleModel="Sửa nhóm"
            rowData={datarow}
            pathModel="ADMIN_GROUP"
        />
    )
}
const ActiveModalComponent: React.FC<{
    datarow: any
}> = ({ datarow }) => {
    return (
        <ButtonModal
            titleModel={`${
                datarow.active
                    ? `vô hiệu hóa nhóm "${datarow.name}"`
                    : `kích hoạt nhóm "${datarow.name}"`
            }`}
            type="ACTIVE_MODAL"
            pathModel="ADMIN_GROUP"
            rowData={datarow}
            activeChecked={datarow.active}
        />
    )
}
const TreeGroup: React.FC<TypeProps> = ({ Group }) => {
    const { dataGlobal, setDataGlobal, treeFilter, setTreeFilter } =
        useContextTree()
    const { expandedKeys, searchValue, autoExpandParent } = treeFilter
    const {
        token: { colorPrimary }
    } = theme.useToken()
    useEffect(() => {
        const dataTree = TreeCustom({
            Tree: Group ?? [],
            searchValue,
            colorSeacrh: colorPrimary,
            AddModel: AddModalComponent,
            UpdateModel: UpdateModalComponent,
            ActiveModal: ActiveModalComponent
        })

        setDataGlobal((data) => ({ ...data, DataNode: dataTree }))
    }, [JSON.stringify(Group), searchValue])

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setTreeFilter((data) => ({
            ...data,
            expandedKeys: newExpandedKeys,
            autoExpandParent: false
        }))
    }
    console.log("group", Group)
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

export default TreeGroup
