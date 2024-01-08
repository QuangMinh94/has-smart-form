"use client"
import { TreeDataType } from "@/app/(types)/TreeDataType"
import PageHeader from "@/app/users/bu/_components/PageHeader"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Flex, Popconfirm, Row, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import type { DataNode } from "antd/es/tree"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { ContextFormManagement } from "./context"
import { CreationForm, DetailsForm, UploadFileForm } from "./form"
import { CreationModal, ReadOnlyModal } from "./modal"

import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import useMessage from "antd/es/message/useMessage"
import axios from "axios"
import { useEnvContext } from "next-runtime-env"
import TreeComp from "./tree"

export type FormTableType = {
    key?: string
    name: string
    size?: string
    creator?: string
    createdDate?: string
    physicalFilePath?: string
    physicalFileName?: string
    type: string
}

const ManagementPage = ({
    treeData,
    treeSelectData,
    contentData
}: {
    treeData: DataNode[]
    treeSelectData: TreeDataType[]
    contentData: FormTableType[]
}) => {
    const [treeKey, setTreeKey] = useState<number>(0)

    useEffect(() => {
        setTreeKey(Math.random())
    }, [JSON.stringify(treeData)])

    return (
        <>
            <div className="pb-[5px] border-b-[2px] border-color:black text-black flex">
                <h2 className="text-lg flex-1">Quản lý form</h2>
            </div>
            <Row className="mt-4 border-b-2 border-black" gutter={10}>
                <Col span={4} className="border-r-2 border-black">
                    <TreeComp key={treeKey} treeSelectData={treeData} />
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
    const pathName = usePathname()
    const [messageApi, contextHolder] = useMessage()
    const { NEXT_PUBLIC_DELETE_FOLDER, NEXT_PUBLIC_DELETE_FILE } =
        useEnvContext()
    const { session, token } = useCustomCookies()
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
        createdDate: string
        ozrId: string
    }>({
        location: "",
        name: "",
        creator: "",
        createdDate: "",
        ozrId: ""
    })

    const columns: ColumnsType<FormTableType> = [
        {
            title: "Tên",
            dataIndex: "name",
            sorter: (a: FormTableType, b: FormTableType) => {
                return a.name.localeCompare(b.name)
            },
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
            title: "Người tạo",
            dataIndex: "creator"
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate"
        },
        {
            title: "Hành động",
            dataIndex: "",
            width: "10%",
            key: "x",
            render: (record: FormTableType, _index) => {
                const title = record.type === "FOLDER" ? "folder" : "file"
                return (
                    <Popconfirm
                        title={"Xóa " + title}
                        description={
                            "Bạn có chắc chắn muốn xóa " + title + " này?"
                        }
                        onConfirm={async () => {
                            const response = await DeleteItem(
                                record,
                                session,
                                token,
                                NEXT_PUBLIC_DELETE_FOLDER!,
                                NEXT_PUBLIC_DELETE_FILE!
                            )
                            if (response) {
                                messageApi.success("Xóa thành công")
                                router.refresh()
                            } else {
                                messageApi.error("Xóa thất bại")
                            }
                        }}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                )
            }
        }
    ]

    return (
        <>
            {contextHolder}
            <PageHeader
                path={pathName}
                addNewPermission={false}
                headerChild={<ButtonGroup treeSelectData={treeSelectData} />}
            >
                <Table
                    /*  rowClassName={(_record, index) =>
                        index % 2 === 0 ? "table-row-light" : "table-row-dark"
                    } */
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
                                        createdDate: record.createdDate!,
                                        ozrId: record.physicalFileName!
                                    })
                                    setOpenDetails(true)
                                }
                            }
                        }
                    }}
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ y: 400 }}
                />
            </PageHeader>
            <ReadOnlyModal
                open={openDetails}
                onCancel={() => setOpenDetails(false)}
                title={<b>Chi tiết</b>}
            >
                <DetailsForm
                    location={fileDetails.location}
                    name={fileDetails.name}
                    creator={fileDetails.creator}
                    createdDate={fileDetails.createdDate}
                    ozrId={fileDetails.ozrId}
                />
            </ReadOnlyModal>
        </>
    )
}

const ButtonGroup = ({
    treeSelectData
}: {
    treeSelectData: TreeDataType[]
}) => {
    const { open, setOpen, deletedItems } = useContext(ContextFormManagement)
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
            >
                {modalKey === "CREATE" ? (
                    <CreationForm treeSelectData={treeSelectData} />
                ) : (
                    <UploadFileForm treeSelectData={treeSelectData} />
                )}
            </CreationModal>
        </Flex>
    )
}

const DeleteItem = async (
    record: FormTableType,
    session: string,
    token: string,
    folderUrl: string,
    fileUrl: string
) => {
    switch (record.type) {
        case "FOLDER":
            try {
                await axios.post(
                    folderUrl,
                    { id: record.key },
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            Session: session
                        }
                    }
                )
                return true
            } catch {
                return false
            }

        default:
            try {
                await axios.post(
                    fileUrl,
                    { id: record.key },
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            Session: session
                        }
                    }
                )

                return true
            } catch {
                return false
            }
    }
}

export default ManagementPage
