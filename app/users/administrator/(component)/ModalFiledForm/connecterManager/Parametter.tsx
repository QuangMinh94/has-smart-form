import { parametter } from "@/app/(types)/formFiled/FormConnectManager/parametter"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import {
    useContextAdmin,
    useContextAdminconnectManager
} from "@/components/cusTomHook/useContext"
import { PlusOutlined } from "@ant-design/icons"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { CollapseProps } from "antd"
import { Button, Collapse, Input, Popover, Table, Typography } from "antd"
import React, { memo, useMemo, useState } from "react"
import FormFeildparameter from "../../form/connecter/FormFieldparameter"

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    field: string
    children: React.ReactNode
    setField: React.Dispatch<React.SetStateAction<string>>
}
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    field,
    setField,
    children,
    ...restProps
}) => {
    const onChange = (e: any) => {
        setField(e.target.value)
    }
    return (
        <td {...restProps}>
            {editing ? <Input onChange={onChange} value={field} /> : children}
        </td>
    )
}

const BtnModal: React.FC<{
    disable?: boolean
    type: typeForm
    dataRow: parametter
}> = memo(({ type, dataRow, disable }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleOpenChange = (newOpen: boolean) => {
        setIsModalOpen(newOpen)
    }
    const btn: any = {
        ADD_MODAL: <Button disabled={disable} icon={<PlusOutlined />} />,
        REMOVE_MODAL: (
            <FontAwesomeIcon
                icon={faTrashAlt}
                className="cursor-pointer hover:opacity-50"
            />
        )
    }
    const title: any = {
        REMOVE_MODAL: "Xóa"
    }
    return (
        <>
            {type === "REMOVE_MODAL" ? (
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
            ) : (
                <>
                    {!isModalOpen ? (
                        <div onClick={() => handleOpenChange(true)}>
                            {btn[type]}
                        </div>
                    ) : (
                        <FormFeildparameter
                            dataRow={dataRow}
                            typeForm={type}
                            CancelModal={handleCancel}
                        />
                    )}
                </>
            )}
        </>
    )
})

const TableParameter: React.FC = memo(() => {
    const { messageApi } = useContextAdmin()
    const {
        DataForm: { parametter },
        setDataForm
    } = useContextAdminconnectManager()
    const [field, setField] = useState<string>("")
    const [editingKey, setEditingKey] = useState<number | null>(null)

    const isEditing = (record: parametter) => record.key === editingKey
    const edit = (record: parametter) => {
        setField(record?.field + "")
        setEditingKey(Number(record?.key))
    }
    const save = (key: number) => {
        if (!field.trim()) {
            messageApi("error", "vui lòng điền đầy đủ thông tin")
            return
        }
        setDataForm((dataForm) => {
            const parametters = dataForm.parametter

            const index = parametters.findIndex(
                (item, index) => index === key - 1
            )

            parametters.splice(index, 1, { field })

            return { ...dataForm, parametter: parametters }
        })
        setEditingKey(null)
    }

    const data = useMemo(() => {
        return parametter.map((item, index) => ({
            ...item,
            key: index + 1
        }))
    }, [JSON.stringify(parametter)])

    const columns = [
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
            dataIndex: "field",
            editable: true
        },
        {
            title: "action",
            key: "action",
            align: "center",
            width: 150,
            render: (record: parametter) => {
                const editable = isEditing(record)
                return (
                    <div className="flex items-center justify-center">
                        {editable ? (
                            <>
                                <Typography.Link
                                    onClick={() => save(Number(record.key))}
                                    style={{ marginRight: 8 }}
                                >
                                    Save
                                </Typography.Link>
                                <Typography.Link
                                    onClick={() => {
                                        setEditingKey(null)
                                    }}
                                    style={{ marginLeft: "5px" }}
                                >
                                    Cancel
                                </Typography.Link>
                            </>
                        ) : (
                            <>
                                <div className="mr-[10px]">
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            !editingKey && edit(record)
                                        }}
                                        icon={faEdit}
                                        className={`${
                                            !editingKey
                                                ? "cursor-pointer hover:opacity-50"
                                                : "cursor-not-allowed opacity-50"
                                        }`}
                                    />
                                </div>
                                {!editingKey ? (
                                    <BtnModal
                                        type="REMOVE_MODAL"
                                        dataRow={record}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="cursor-not-allowed opacity-50"
                                    />
                                )}
                            </>
                        )}
                    </div>
                )
            }
        }
    ]
    const mergedColumns: any = columns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: parametter) => ({
                field,
                editing: isEditing(record),
                setField
            })
        }
    })
    return (
        <>
            <div className="my-[14px]">
                <BtnModal
                    disable={!!editingKey}
                    type="ADD_MODAL"
                    dataRow={{}}
                />
            </div>

            <Table
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                scroll={{
                    y: "54vh",
                    scrollToFirstRowOnChange: true
                }}
                columns={mergedColumns}
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
