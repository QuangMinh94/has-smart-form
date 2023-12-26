"use client"
import { TreeDataType } from "@/app/(types)/TreeDataType"
import PageHeader from "@/app/users/bu/_components/PageHeader"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Flex, Row, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import type { DataNode } from "antd/es/tree"
import { useRouter } from "next/navigation"
import React, { useContext, useState } from "react"
import { ContextFormManagement } from "./context"
import { CreationForm, DetailsForm, UploadFileForm } from "./form"
import { CreationModal, ReadOnlyModal } from "./modal"

import TreeComp from "./tree"

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
    return (
        <>
            <div className="pb-[5px] border-b-[2px] border-color:black text-black flex">
                <h2 className="text-lg flex-1">Quản lý form</h2>
            </div>
            <Row className="mt-4 border-b-2 border-black" gutter={10}>
                <Col span={4} className="border-r-2 border-black">
                    <TreeComp treeSelectData={treeData} />
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
    const router = useRouter()
    const { setSelectedKey, openDetails, setOpenDetails } = useContext(
        ContextFormManagement
    )
    const [popupState, setPopupState] = useState<{
        record: any
        visible: boolean
        x: number
        y: number
    }>({
        record: "",
        visible: false,
        x: 0,
        y: 0
    })

    const [fileDetails, setFileDetails] = useState<{
        location: string
        name: string
        creator: string
        createdDate: Date | undefined
        ozrId: string
    }>({
        location: "",
        name: "",
        creator: "",
        createdDate: undefined,
        ozrId: ""
    })

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: FormTableType[]
        ) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            )
        }
    }

    return (
        <>
            <PageHeader
                path="/users/administrator/formManagement"
                addNewPermission={false}
                headerChild={<ButtonGroup treeSelectData={treeSelectData} />}
            >
                <Table
                    rowSelection={{
                        ...rowSelection
                    }}
                    rowClassName={(_record, index) =>
                        index % 2 === 0 ? "table-row-light" : "table-row-dark"
                    }
                    onRow={(record, rowIndex) => {
                        return {
                            onContextMenu: (event) => {
                                event.preventDefault()
                                if (!popupState.visible) {
                                    document.addEventListener(
                                        `click`,
                                        function onClickOutside() {
                                            setPopupState({
                                                ...popupState,
                                                visible: false
                                            })
                                            document.removeEventListener(
                                                `click`,
                                                onClickOutside
                                            )
                                        }
                                    )
                                }
                                setPopupState({
                                    record: record,
                                    visible: true,
                                    x: event.clientX,
                                    y: event.clientY
                                })
                            }, // right button click row

                            onDoubleClick: () => {
                                if (record.type === "FOLDER") {
                                    setSelectedKey([record.key!])
                                    router.push(
                                        "/users/administrator/formManagement?folderId=" +
                                            record.key
                                    )
                                    router.refresh()
                                } else {
                                    setFileDetails({
                                        location: record.physicalFilePath!,
                                        name: record.name,
                                        creator: record.creator!,
                                        createdDate: record.createdDate,
                                        ozrId: record.physicalFileName!
                                    })
                                    setOpenDetails(true)
                                }
                            }
                        }
                    }}
                    dataSource={dataSource}
                    columns={columns}
                />
            </PageHeader>
            <ReadOnlyModal
                open={openDetails}
                onCancel={() => setOpenDetails(false)}
                title={<b>Chi tiết</b>}
                children={
                    <DetailsForm
                        location={fileDetails.location}
                        name={fileDetails.name}
                        creator={fileDetails.creator}
                        createdDate={
                            fileDetails.createdDate
                                ? fileDetails.createdDate
                                : undefined
                        }
                        ozrId={fileDetails.ozrId}
                    />
                }
            />
        </>
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
