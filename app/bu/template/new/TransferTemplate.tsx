"use client"
import ButtonLeftandRight from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/ButtonCusTom"
import Container from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/Container"
import LayoutTranfer from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/LayoutTranfer"
import { useContextTemplate } from "@/components/cusTomHook/useContextTemplate"
import "@/public/css/myWork/detailMyWork.css"
import { TreeSelect } from "antd"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TreeDataType } from "../../_types/TreeDataType"

const TreeSelectComp = ({ treeData }: { treeData: TreeDataType[] }) => {
    const [value, setValue] = useState<string>()

    /* const getParentTitle = (key: any, tree: any): any => {
        let parentTitle
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i]
            if (node.children) {
                if (node.children.some((item: any) => item.key === key)) {
                    parentTitle = node.title
                } else if (getParentTitle(key, node.children)) {
                    parentTitle = getParentTitle(key, node.children)
                }
            }
        }
        return parentTitle
    }
     const onChange = (newValue: string) => {
        console.log("New value", value)
        setValue(newValue)
    } */
    const onSelect = (selectedKeys: any, info: any) => {
        console.log("selected", selectedKeys, info)
    }
    return (
        <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            //onChange={onChange}
            onSelect={onSelect}
            treeData={treeData}
        />
    )
}

const TransferTemplate = ({ treeData }: { treeData: TreeDataType[] }) => {
    const {
        listLeft,
        listRight,
        setListLeft,
        setListRight,
        setChangeListFilter,
        ChangeListFilter
    } = useContextTemplate()

    return (
        <DndProvider backend={HTML5Backend}>
            <LayoutTranfer
                ColLeft={
                    <Container
                        HidenUI={<TreeSelectComp treeData={treeData} />}
                        setChangeListFilter={setChangeListFilter}
                        ChangeListFilter={ChangeListFilter}
                        title="Danh sách block"
                        type={"left"}
                        setList={setListLeft}
                        list={listLeft}
                        setRomoveList={setListRight}
                    />
                }
                Button={
                    <ButtonLeftandRight
                        listLeft={listLeft}
                        listRight={listRight}
                        setListLeft={setListLeft}
                        setListRight={setListRight}
                        setChangeListFilter={setChangeListFilter}
                    />
                }
                ColRight={
                    <Container
                        setChangeListFilter={setChangeListFilter}
                        ChangeListFilter={ChangeListFilter}
                        title="Block được chọn"
                        type={"right"}
                        setList={setListRight}
                        list={listRight}
                        setRomoveList={setListLeft}
                    />
                }
            />
        </DndProvider>
    )
}

export default TransferTemplate
