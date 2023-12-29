"use client"
import { connnector } from "@/app/(types)/Connecter"
import BtnModal from "@/app/users/administrator/(component)/BtnModal"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import React from "react"

const columns: ColumnsType<connnector> = [
    {
        title: "STT",
        dataIndex: "key",
        width: "5vw",
        align: "center",
        key: "stt"
    },
    {
        title: "Tên",
        key: "name",
        dataIndex: "name"
    },
    {
        title: "Loại kết nối",
        key: "type",
        render: (record: connnector) => {
            return `${record?.authenInfo?.type ?? ""}`
        }
    },

    {
        title: "Thay đổi lần cuối",
        key: "updateDate",
        render: (record: connnector) => {
            return dayjs(record?.updatedDate).format("DD/MM/YYYY HH:mm:ss")
        }
    },
    {
        title: "Chỉnh sửa",
        width: "8vw",
        align: "center",
        key: "edit",
        render: (record: connnector) => (
            <BtnModal
                titleModel="Sửa Connector"
                type="UPDATE_MODAL"
                pathModel="ADMIN_CONNECTER_MANAGER"
                rowData={record}
            />
        )
    },
    {
        title: "Kích hoạt",
        width: "8vw",
        align: "center",
        key: "active",
        render: (record: connnector) => (
            <BtnModal
                titleModel={`${
                    record.active
                        ? `hủy kết nối "${record.name}"`
                        : `kích hoạt kết nối "${record.name}"`
                }`}
                type="ACTIVE_MODAL"
                pathModel="ADMIN_CONNECTER_MANAGER"
                rowData={record}
                activeChecked={record.active}
            />
        )
    }
]

type Props = { connnector: connnector[] }
const App: React.FC<Props> = ({ connnector }) => {
    return (
        <Table
            scroll={{
                y: "54vh",
                scrollToFirstRowOnChange: true
            }}
            columns={columns}
            dataSource={connnector}
        />
    )
}

export default App
