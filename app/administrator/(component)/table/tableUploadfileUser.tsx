import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Checkbox, Popconfirm, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useContextAdminUser } from "@/components/cusTomHook/useContext"
import React from "react"

import { Users } from "@/app/(types)/Users"

import ButtonModel from "@/app/administrator/(component)/BtnModal"
const App: React.FC = () => {
    const {
        dataGlobal: { DataUploadUsers }
    } = useContextAdminUser()

    const HandlerDelete = (key: string) => {
        // dispatch(deleteRowUploadUser(key))
    }
    const HandlerUpdateActive = (id: string, active: boolean) => {
        // dispatch(updateUploadUser({ key: id, row: { Active: !active } }))
    }
    const columns: ColumnsType<Users> = [
        {
            title: "Stt",
            dataIndex: "_id",
            key: "_id",
            width: "5vw",
            align: "center",
            fixed: "left"
        },
        {
            title: "Họ tên",
            key: "fullName",
            render: (data: Users) => `${data.lastName} ${data.firstName}`
        },
        {
            title: "Tên đăng nhập",
            key: "userName",
            dataIndex: "userName"
        },
        {
            title: "Chi nhánh",
            key: "department",
            width: "12vw",
            align: "left",
            render: (data: Users) => data.department?.name ?? ""
        },
        {
            title: "Chức vụ",
            key: "group",
            dataIndex: "group",
            width: "12vw",
            align: "left",
            render: (Group) => Group?.[0].Name ?? ""
        },
        {
            title: "Active",
            key: " Active",
            width: "8vw",
            align: "center",

            render: (user: Users) => (
                <Popconfirm
                    title={` Sure to ${
                        user?.active ? "deActive" : "Active"
                    } user?`}
                    onConfirm={() => {
                        HandlerUpdateActive(user?._id ?? "", !!user.active)
                    }}
                >
                    <Checkbox checked={user.active} />
                </Popconfirm>
            )
        },
        {
            title: "Action",
            key: " Edit",
            width: "8vw",
            align: "center",
            fixed: "right",
            render: (user: Users) => (
                <>
                    <ButtonModel
                        titleModel="Sửa tài khoản"
                        type="UPDATE_MODAL"
                        pathModel="ADMIN_USER"
                        rowData={user}
                    />
                    <Popconfirm
                        title="Sure to delete user?"
                        onConfirm={() => {
                            HandlerDelete(user?._id ?? "")
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                    </Popconfirm>
                </>
            )
        }
    ]

    return (
        <Table
            scroll={{
                y: 270,
                x: 1300,
                scrollToFirstRowOnChange: true
            }}
            bordered
            dataSource={DataUploadUsers.map((user) => ({
                ...user,
                key: user._id
            }))}
            columns={columns}
            pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"]
            }}
        />
    )
}

export default App
