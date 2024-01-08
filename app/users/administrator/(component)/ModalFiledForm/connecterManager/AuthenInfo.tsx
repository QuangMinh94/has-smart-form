import { authenInfo } from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import FormFieldAuthenInfo from "@/app/users/administrator/(component)/form/connecter/FormFieldAuthenInfo"
import FormFiledInfoText from "@/app/users/administrator/(component)/form/connecter/FormFiledInfoText"
import {
    useContextAdmin,
    useContextAdminconnectManager
} from "@/components/cusTomHook/useContext"
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons"

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { CollapseProps } from "antd"
import { Button, Collapse, Input, Popover, Table, Typography } from "antd"
import React, { memo, useMemo, useState } from "react"
export type typeAuthen = "header" | "body" | "fieldHeader"

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    value: authenInfo
    children: React.ReactNode
    setValue: React.Dispatch<React.SetStateAction<authenInfo>>
    typeInput: string
    inputPassword: boolean
}
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    value,
    setValue,
    typeInput,
    children,
    inputPassword,
    ...restProps
}) => {
    const onChange = (e: any) => {
        console.log("typeInput", typeInput)
        // setField(e.target.value)
        const { name, value } = e.target
        setValue((data) => ({ ...data, [name]: value }))
    }
    const valueCustome =
        typeInput === "name"
            ? value?.name
            : typeInput === "value"
            ? value?.value
            : value?.description
    const propsInput = {
        name: typeInput,
        onChange,
        value: valueCustome
    }
    const InputCustom = inputPassword ? (
        <Input.Password {...propsInput} />
    ) : (
        <Input {...propsInput} />
    )

    return <td {...restProps}>{editing ? InputCustom : children}</td>
}
const BtnCustomer: React.FC<{
    type: typeAuthen
    typeActionForm: typeForm
    datarow: authenInfo
    disabled?: boolean
}> = memo(({ type, typeActionForm, datarow, disabled }) => {
    const [open, setOpen] = useState(false)

    const hide = () => {
        setOpen(false)
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    const btn: any = {
        ADD_MODAL: (
            <Button disabled={disabled}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
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
            {typeActionForm === "REMOVE_MODAL" ? (
                <Popover
                    title={title[typeActionForm]}
                    trigger="click"
                    destroyTooltipOnHide={true}
                    open={open}
                    content={
                        <FormFieldAuthenInfo
                            datarow={datarow}
                            typeAcTionForm={typeActionForm}
                            CancelModal={hide}
                            typeForm={type}
                        />
                    }
                    onOpenChange={handleOpenChange}
                >
                    {btn[typeActionForm]}
                </Popover>
            ) : (
                <>
                    {!open ? (
                        <div onClick={() => handleOpenChange(true)}>
                            {btn[typeActionForm]}
                        </div>
                    ) : (
                        <FormFieldAuthenInfo
                            datarow={datarow}
                            typeAcTionForm={typeActionForm}
                            CancelModal={hide}
                            typeForm={type}
                        />
                    )}
                </>
            )}
        </>
    )
})
BtnCustomer.displayName = "BtnCustomer"
//table

type PropsTable = { type: typeAuthen }

const Handelerupdate = (
    dataHandeler: any,
    dataUpdate: authenInfo,
    key: number
) => {
    const index = dataHandeler.findIndex(
        (item: any, index: number) => index === key - 1
    )
    dataHandeler.splice(index, 1, dataUpdate)
}
const TableauthenInfo: React.FC<PropsTable> = memo(({ type }) => {
    const {
        setDataForm,
        DataForm: { authenInfo }
    } = useContextAdminconnectManager()
    const { messageApi } = useContextAdmin()
    const [value, setValue] = useState<authenInfo>({})
    const [editingKey, setEditingKey] = useState<number | null>(null)

    const isEditing = (record: authenInfo) => record.key === editingKey
    const edit = (record: authenInfo) => {
        setValue((data) => {
            const dataUpdate = {
                value: record?.value ?? undefined,
                name: record?.name ?? undefined,
                description: record?.description ?? undefined
            }
            if (type === "fieldHeader") {
                delete dataUpdate.value
                delete dataUpdate.description
            }
            return {
                ...data,
                ...dataUpdate
            }
        })
        setEditingKey(Number(record?.key))
    }
    const save = (key: number) => {
        if (!value.name?.trim()) {
            messageApi(
                "error",
                `vui lòng nhập ${
                    type === "fieldHeader" ? "thông tin" : "trường hệ thống"
                }`
            )
            return
        }
        if (!value.value?.trim() && type !== "fieldHeader") {
            messageApi("error", "vui lòng nhập giá trị")
            return
        }
        setDataForm((dataForm) => {
            const authenHeader = dataForm.authenInfo.header
            const authenBody = dataForm.authenInfo.body
            const authenFieldHeader = dataForm.authenInfo.fieldsHeader
            if (type === "header") {
                Handelerupdate(authenHeader, value, key)
            }
            if (type === "body") {
                Handelerupdate(authenBody, value, key)
            }
            if (type === "fieldHeader") {
                Handelerupdate(authenFieldHeader, { name: value.name }, key)
            }
            return {
                ...dataForm,
                authenInfo: {
                    ...dataForm.authenInfo,
                    header: authenHeader,
                    body: authenBody,
                    fieldsHeader: authenFieldHeader
                }
            }
        })
        setEditingKey(null)
    }

    const render = (record: authenInfo) => {
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
                            <BtnCustomer
                                type={type}
                                typeActionForm="REMOVE_MODAL"
                                datarow={record}
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
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            align: "center",
            key: "stt",

            width: 60
        },
        {
            title: "Tên trường hệ thống",
            dataIndex: "name",
            align: "center",
            key: "name",
            width: 200,
            editable: true
        },
        {
            title: "Giá trị",

            align: "center",
            key: "value",
            editable: true,
            width: 100,
            render: (record: authenInfo) => {
                return record?.name?.toLowerCase() === "password".toLowerCase()
                    ? "********"
                    : record.value
            }
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            align: "center",
            key: "description",
            editable: true,

            width: 100
        },
        {
            title: "action",
            key: "action",
            align: "center",
            width: 100,
            render
        }
    ]
    const columnsFieldHeader = [
        {
            title: "STT",
            dataIndex: "key",
            align: "center",
            key: "stt",
            width: 60
        },
        {
            title: "Thông tin",
            dataIndex: "name",
            align: "center",
            key: "name",
            editable: true
        },
        {
            title: "action",
            key: "action",
            width: 150,
            align: "center",
            render
        }
    ]
    const col =
        type === "header" || type === "body" ? columns : columnsFieldHeader
    const dataInfo =
        type === "header"
            ? authenInfo.header
            : type === "fieldHeader"
            ? authenInfo.fieldsHeader
            : authenInfo.body

    const data = useMemo(() => {
        return dataInfo?.map((item, index) => ({
            ...item,
            key: index + 1
        }))
    }, [JSON.stringify(dataInfo)])

    const mergedColumns: any = col.map((col: any) => {
        if (!col?.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: authenInfo) => ({
                value,
                editing: isEditing(record),
                setValue,
                typeInput: col.key,
                inputPassword:
                    record?.name?.toLowerCase() === "password".toLowerCase() &&
                    col.key === "value"
            })
        }
    })
    return (
        <>
            <Table
                scroll={{
                    y: "54vh",
                    scrollToFirstRowOnChange: true
                }}
                columns={mergedColumns}
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                dataSource={data}
            />
            <div className="mt-[10px]">
                <BtnCustomer
                    disabled={!!editingKey}
                    datarow={{}}
                    typeActionForm="ADD_MODAL"
                    type={type}
                />
            </div>
        </>
    )
})
TableauthenInfo.displayName = "TableauthenInfo"

//collapse
const itemsNest: CollapseProps["items"] = [
    {
        key: "1",
        label: "Header",
        children: <TableauthenInfo type="header" />
    },
    {
        key: "2",
        label: "Body",
        children: <TableauthenInfo type="body" />
    },
    {
        key: "3",
        label: "FieldHeader",
        children: <TableauthenInfo type="fieldHeader" />
    }
]
const itemsCollapse: CollapseProps["items"] = [
    {
        key: "authenInfo",
        label: "authenInfo",

        children: (
            <>
                <FormFiledInfoText />
                <Collapse size="small" items={itemsNest} />
            </>
        )
    }
]
const CollapseCustomer: React.FC = () => {
    return <Collapse size="small" items={itemsCollapse} />
}

export default memo(CollapseCustomer)
