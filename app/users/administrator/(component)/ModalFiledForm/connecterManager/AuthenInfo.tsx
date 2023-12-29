import {
    authenInfo,
    authenInfoFieldHeader
} from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import FormFieldAuthenInfo from "@/app/users/administrator/(component)/form/connecter/FormFieldAuthenInfo"
import FormFiledInfoText from "@/app/users/administrator/(component)/form/connecter/FormFiledInfoText"
import { useContextAdminconnectManager } from "@/components/cusTomHook/useContext"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { CollapseProps } from "antd"
import { Button, Collapse, Popover, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import React, { memo, useMemo, useState } from "react"
export type typeAuthen = "header" | "body" | "fieldHeader"
const BtnCustomer: React.FC<{
    type: typeAuthen
    typeActionForm: typeForm
    datarow: authenInfo
}> = memo(({ type, typeActionForm, datarow }) => {
    const [open, setOpen] = useState(false)

    const hide = () => {
        setOpen(false)
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    const btn: any = {
        ADD_MODAL: (
            <Button>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        ),
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
    )
})
BtnCustomer.displayName = "BtnCustomer"
//table

type PropsTable = { type: typeAuthen }

const TableauthenInfo: React.FC<PropsTable> = memo(({ type }) => {
    const {
        DataForm: { authenInfo }
    } = useContextAdminconnectManager()
    const columns: ColumnsType<authenInfo> = [
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
            width: 200
        },
        {
            title: "Giá trị",
            dataIndex: "value",
            align: "center",
            key: "value",
            width: 100
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            align: "center",
            key: "description",

            width: 100
        },
        {
            title: "action",
            key: "action",
            align: "center",
            width: 100,
            render: (record: authenInfo) => {
                return (
                    <div className="flex items-center justify-center">
                        <div className="mr-[10px]">
                            <BtnCustomer
                                type={type}
                                typeActionForm="UPDATE_MODAL"
                                datarow={record}
                            />
                        </div>
                        <BtnCustomer
                            type={type}
                            typeActionForm="REMOVE_MODAL"
                            datarow={record}
                        />
                    </div>
                )
            }
        }
    ]
    const columnsFieldHeader: ColumnsType<authenInfoFieldHeader> = [
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
            key: "name"
        },
        {
            title: "action",
            key: "action",
            width: 100,
            align: "center",
            render: (record: authenInfo) => {
                return (
                    <div className="flex items-center justify-center">
                        <div className="mr-[10px]">
                            <BtnCustomer
                                type={type}
                                typeActionForm="UPDATE_MODAL"
                                datarow={record}
                            />
                        </div>
                        <BtnCustomer
                            type={type}
                            typeActionForm="REMOVE_MODAL"
                            datarow={record}
                        />
                    </div>
                )
            }
        }
    ]
    const dataInfo =
        type === "header"
            ? authenInfo.header
            : type === "fieldHeader"
            ? authenInfo.fieldsHeader
            : authenInfo.body
    console.log(dataInfo)
    const data = useMemo(() => {
        return dataInfo?.map((item, index) => ({
            ...item,
            key: index + 1
        }))
    }, [JSON.stringify(dataInfo)])
    return (
        <>
            <Table
                scroll={{
                    y: "54vh",
                    scrollToFirstRowOnChange: true
                }}
                columns={
                    type === "header" || type === "body"
                        ? columns
                        : columnsFieldHeader
                }
                dataSource={data}
            />
            <div className="mt-[10px]">
                <BtnCustomer
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
        children: <TableauthenInfo type="fieldHeader" />
    },
    {
        key: "2",
        label: "Body",
        children: <TableauthenInfo type="body" />
    },
    // {
    //     key: "3",
    //     label: "FieldHeader",
    //     children: <TableauthenInfo type="fieldHeader" />
    // },
    {
        key: "4",
        label: "Infomation text",
        children: <FormFiledInfoText />
    }
]
const itemsCollapse: CollapseProps["items"] = [
    {
        key: "authenInfo",
        label: "authenInfo",

        children: <Collapse size="small" items={itemsNest} />
    }
]
const CollapseCustomer: React.FC = () => {
    return <Collapse size="small" items={itemsCollapse} />
}

export default memo(CollapseCustomer)
