"use client"
import { TreeDataType } from "@/app/(types)/TreeDataType"
import PageHeader from "@/app/users/bu/_components/PageHeader"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Flex, Row, Table, Tree } from "antd"
import { ColumnsType } from "antd/es/table"
import type { DataNode, TreeProps } from "antd/es/tree"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { ContextFormManagement } from "./context"
import { CreationForm, UploadFileForm } from "./form"
import { CreationModal } from "./modal"

export type FormTableType = {
    key?: string
    name: string
    size: string
    creator?: string
    createdDate?: Date
    physicalFilePath?: string
    physicalFileName?: string
    type: string
}

const columns: ColumnsType<FormTableType> = [
    {
        title: "Tên",
        dataIndex: "name",
        render(_value, record, _index) {
            return (
                <Flex align="center" gap={10}>
                    <FontAwesomeIcon
                        icon={record.type === "FILE" ? faFile : faFolder}
                    />
                    {record.name}
                </Flex>
            )
        }
    },
    {
        title: "Dung lượng",
        dataIndex: "size"
    },
    {
        title: "Người tạo",
        dataIndex: "creator"
    },
    {
        title: "Ngày tạo",
        dataIndex: "createdDate"
    }
]

const ManagementPage = ({
    treeData,
    treeSelectData,
    contentData
}: {
    treeData: DataNode[]
    treeSelectData: TreeDataType[]
    contentData: FormTableType[]
}) => {
    const router = useRouter()
    const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
        console.log("selected", selectedKeys, info)
        router.push(
            "/users/administrator/formManagement?folderId=" + selectedKeys
        )
        router.refresh()
    }
    return (
        <>
            <div className="pb-[5px] border-b-[2px] border-color:black text-black flex">
                <h2 className="text-lg flex-1">Quản lý form</h2>
            </div>
            <Row className="mt-4 border-b-2 border-black" gutter={10}>
                <Col span={4} className="border-r-2 border-black">
                    <Tree treeData={treeData} onSelect={onSelect} />
                </Col>
                <Col span={20}>
                    <TableLayout
                        dataSource={contentData}
                        treeSelectData={treeSelectData}
                    />
                </Col>
            </Row>
        </>
    )
}

const TableLayout = ({
    dataSource,
    treeSelectData
}: {
    dataSource: FormTableType[]
    treeSelectData: TreeDataType[]
}) => {
    return (
        <PageHeader
            path="/users/administrator/formManagement"
            addNewPermission={false}
            headerChild={<ButtonGroup treeSelectData={treeSelectData} />}
        >
            <Table dataSource={dataSource} columns={columns} />
        </PageHeader>
    )
}

const ButtonGroup = ({
    treeSelectData
}: {
    treeSelectData: TreeDataType[]
}) => {
    const { open, setOpen } = useContext(ContextFormManagement)
    const [modalKey, setModalKey] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const onClickUpload = () => {
        setOpen(true)
        setModalKey("UPLOAD")
        setTitle("Tải tệp lên")
    }
    const onClickCreateFolder = () => {
        setOpen(true)
        setModalKey("CREATE")
        setTitle("Tạo thư mục")
    }
    return (
        <Flex gap={10}>
            <Button type="primary" onClick={onClickUpload}>
                Tải tệp lên
            </Button>
            <Button type="primary" onClick={onClickCreateFolder}>
                Tạo thư mục
            </Button>
            <CreationModal
                key={modalKey}
                open={open}
                onCancel={() => setOpen(false)}
                title={<b>{title}</b>}
                children={
                    modalKey === "CREATE" ? (
                        <CreationForm treeSelectData={treeSelectData} />
                    ) : (
                        <UploadFileForm treeSelectData={treeSelectData} />
                    )
                }
            />
        </Flex>
    )
}

export default ManagementPage
