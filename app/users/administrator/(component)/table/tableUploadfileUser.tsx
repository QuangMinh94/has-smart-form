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
        dataGlobal: { DataUploadUsers },
        setDataGlobal
    } = useContextAdminUser()

    const HandlerDelete = (key: string) => {
        // dispatch(deleteRowUploadUser(key))
        setDataGlobal((data) => {
            const DataUploadUsersRemove = data.DataUploadUsers.filter(
                (user) => user._id !== key
            )
            return { ...data, DataUploadUsers: DataUploadUsersRemove }
        })
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
            width: "12vw",
            ellipsis: true,
            key: "fullName",
            render: (data: Users) => `${data.lastName} ${data.firstName}`
        },
        {
            title: "Tên đăng nhập",
            key: "userName",
            width: "12vw",
            ellipsis: true,
            dataIndex: "userName"
        },
        {
            title: "Chi nhánh",
            key: "department",

            align: "left",
            render: (data: Users) => data.department?.name ?? ""
        },
        {
            title: "Chức vụ",
            key: "group",
            ellipsis: true,
            align: "left",
            render: (data: Users) => data?.defaultGroup?.name
        },
        {
            title: "Active",
            key: " Active",
            width: "8vw",
            align: "center",

            render: (user: Users) => <Checkbox checked={user.active} />
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
                        isUploadNotApi={true}
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
            style={{ marginTop: "2.5vh" }}
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
