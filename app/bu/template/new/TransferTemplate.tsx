"use client"
import { uniqueValue } from "@/app/(utilities)/ArrayUtilities"
import ButtonLeftandRight from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/ButtonCusTom"
import Container from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/Container"
import LayoutTranfer from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/LayoutTranfer"
import { useContextTemplate } from "@/components/cusTomHook/useContextTemplate"
import "@/public/css/myWork/detailMyWork.css"
import { TreeSelect } from "antd"
import axios from "axios"
import { useEnvContext } from "next-runtime-env"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TreeDataType } from "../../_types/TreeDataType"
import { OptionProps } from "../[id]/page"

const TreeSelectComp = ({ treeData }: { treeData: TreeDataType[] }) => {
    const { listRight, setSelectedTree, setListLeft } = useContextTemplate()
    const { NEXT_PUBLIC_EFORM_LIST } = useEnvContext()

    const updateListLeft = async (selectedKeys: any) => {
        console.log("ListRIght", listRight)
        const response = await axios.post(NEXT_PUBLIC_EFORM_LIST!, {
            repository: selectedKeys
        })
        const res_1 = response.data as {
            name: string
            repository: string
            serverPath: string
        }[]
        const _option: OptionProps[] = []
        res_1.forEach((resChild) => {
            _option.push({
                id: resChild.repository + "/" + resChild.name,
                name: resChild.name,
                checkBox: false,
                type: resChild.repository
            })
        })
        console.log("Option", _option)
        console.log("Right", listRight)
        //setListLeft(_option)
        setListLeft(uniqueValue(_option, listRight))
    }

    const onSelect = (selectedKeys: any, info: any) => {
        console.log("selected", selectedKeys, info)
        setSelectedTree(selectedKeys)
        updateListLeft(selectedKeys)
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

const TransferTemplate = ({
    treeData,
    disabled
}: {
    treeData: TreeDataType[]
    disabled: boolean
}) => {
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
                HiddenColLeft={disabled}
                ColLeft={
                    <Container
                        HidenUI={<TreeSelectComp treeData={treeData} />}
                        setChangeListFilter={setChangeListFilter}
                        ChangeListFilter={ChangeListFilter}
                        title="Danh sách Khối thông tin"
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
                        title="Danh sách Khối thông tin được chọn"
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
