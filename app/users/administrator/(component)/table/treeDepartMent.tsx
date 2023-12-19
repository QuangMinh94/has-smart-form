"use client"
import { Department } from "@/app/(types)/Department"
import ButtonModal from "@/app/users/administrator/(component)/BtnModal"
import { useContextTree } from "@/components/cusTomHook/useContext"
import { Tree, theme } from "antd"
import React, { useEffect } from "react"

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
const ActiveModalComponent: React.FC<{
    datarow: any
}> = ({ datarow }) => {
    return (
        <ButtonModal
            titleModel={`${
                datarow.active
                    ? `vô hiệu hóa chi nhánh "${datarow.name}"`
                    : `kích hoạt chi nhánh "${datarow.name}"`
            }`}
            type="ACTIVE_MODAL"
            pathModel="ADMIN_DEPARTMENT"
            rowData={datarow}
            activeChecked={datarow.active}
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
            Tree: Department ?? [],
            searchValue,
            colorSeacrh: colorPrimary,
            AddModel: AddModalComponent,
            UpdateModel: UpdateModalComponent,
            ActiveModal: ActiveModalComponent
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
    console.log(Department)
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
