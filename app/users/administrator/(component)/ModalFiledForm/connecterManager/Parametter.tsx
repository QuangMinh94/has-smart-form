import { parametter } from "@/app/(types)/formFiled/FormConnectManager/parametter"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import { useContextAdminconnectManager } from "@/components/cusTomHook/useContext"
import { PlusOutlined } from "@ant-design/icons"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { CollapseProps } from "antd"
import { Button, Collapse, Popover, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { memo, useMemo, useState } from "react"
import FormFeildparameter from "../../form/connecter/FormFieldparameter"
const columns: ColumnsType<parametter> = [
    {
        title: "STT",
        dataIndex: "key",
        align: "center",
        key: "stt",
        width: 60
    },
    {
        title: "filed",
        key: "field",
        dataIndex: "field"
    },
    {
        title: "action",
        key: "action",
        align: "center",
        width: 100,
        render: (record: parametter) => {
            return (
                <div className="flex items-center justify-center">
                    <div className="mr-[10px]">
                        <BtnModal type="UPDATE_MODAL" dataRow={record} />
                    </div>
                    <BtnModal type="REMOVE_MODAL" dataRow={record} />
                </div>
            )
        }
    }
]
const BtnModal: React.FC<{ type: typeForm; dataRow: parametter }> = memo(
    ({ type, dataRow }) => {
        const [isModalOpen, setIsModalOpen] = useState(false)

        const handleCancel = () => {
            setIsModalOpen(false)
        }
        const handleOpenChange = (newOpen: boolean) => {
            setIsModalOpen(newOpen)
        }
        const btn: any = {
            ADD_MODAL: <Button icon={<PlusOutlined />}>Thêm parametter</Button>,
            UPDATE_MODAL: (
                <FontAwesomeIcon
                    icon={faEdit}
                    className="cursor-pointer hover:opacity-50"
                />
            ),
            REMOVE_MODAL: (
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="cursor-pointer hover:opacity-50"
                />
            )
        }
        const title: any = {
            ADD_MODAL: "Thêm dòng",
            UPDATE_MODAL: "Cập nhật",
            REMOVE_MODAL: "Xóa"
        }
        return (
            <>
                <Popover
                    open={isModalOpen}
                    title={title[type]}
                    style={{ top: "10px" }}
                    trigger="click"
                    destroyTooltipOnHide={true}
                    content={
                        <FormFeildparameter
                            dataRow={dataRow}
                            typeForm={type}
                            CancelModal={handleCancel}
                        />
                    }
                    onOpenChange={handleOpenChange}
                >
                    {btn[type]}
                </Popover>
            </>
        )
    }
)

const TableParameter: React.FC = memo(() => {
    const {
        DataForm: { parametter }
    } = useContextAdminconnectManager()

    const data = useMemo(() => {
        return parametter.map((item, index) => ({
            ...item,
            key: index + 1
        }))
    }, [JSON.stringify(parametter)])
    return (
        <>
            <div className="my-[14px]">
                <BtnModal type="ADD_MODAL" dataRow={{}} />
            </div>

            <Table
                scroll={{
                    y: "54vh",
                    scrollToFirstRowOnChange: true
                }}
                columns={columns}
                dataSource={data}
            />
        </>
    )
})

BtnModal.displayName = "BtnModal"
TableParameter.displayName = "TableParameter"
// const ModalParameter: React.FC = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false)

//     const showModal = () => {
//         setIsModalOpen(true)
//     }

//     const handleOk = () => {
//         setIsModalOpen(false)
//     }

//     const handleCancel = () => {
//         setIsModalOpen(false)
//     }

//     return (
//         <>
//             <Button icon={<PlusOutlined />} onClick={showModal}>
//                 Thêm Parametter
//             </Button>
//             <Modal
//                 open={isModalOpen}
//                 onCancel={handleCancel}
//                 destroyOnClose={true}
//                 footer={null}
//                 title="Parameters"
//                 width={"90%"}
//                 style={{ top: "10px" }}
//             >
//                 <TableParameter />
//             </Modal>
//         </>
//     )
// }
const itemsCollapse: CollapseProps["items"] = [
    {
        key: "parameters",
        label: "parameters",
        children: <TableParameter />
    }
]
const CollapseCustomer: React.FC = () => {
    return <Collapse size="small" items={itemsCollapse} />
}
export default memo(CollapseCustomer)
