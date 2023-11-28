"use client"
import React, { useState, useEffect, useMemo } from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Users } from "@/app/(types)/Users"
import BtnModal from "../BtnModal"
import { useRouter } from "next/navigation"

const columns: ColumnsType<Users> = [
    {
        title: "STT",
        dataIndex: "key",
        width: "5vw",
        align: "center"
    },
    {
        title: "Họ tên",
        render: (user: Users) => {
            return `${user?.firstName} ${user?.lastName}`
        }
    },
    {
        title: "Tên đăng nhập",
        dataIndex: "userName"
    },
    {
        title: "Chi nhánh",
        render: (user: Users) => {
            return `${user?.department?.name}`
        }
    },
    {
        title: "Chỉnh sửa",
        width: "8vw",
        align: "center",
        render: (record: Users) => (
            <BtnModal
                titleModel="Sửa tài khoản"
                type="UPDATE_MODAL"
                pathModel="ADMIN_USER"
                rowData={record}
            />
        )
    },
    {
        title: "Kích hoạt",
        width: "8vw",
        align: "center",
        render: (record: Users) => (
            <BtnModal
                titleModel={`${
                    record.active
                        ? `hủy tài khoản "${record.userName}"`
                        : `kích hoạt tài khoản "${record.userName}"`
                }`}
                type="ACTIVE_MODAL"
                pathModel="ADMIN_USER"
                rowData={record}
                activeChecked={record.active}
            />
        )
    }
]

type Props = { Users: Users[] }
const App: React.FC<Props> = ({ Users }) => {
    const Router = useRouter()

    const newUser = useMemo(() => {
        Users.sort((a: Users, b: Users) => {
            const nameA = `${a?.firstName}`.toUpperCase().replace(/\s/g, "")
            const nameB = `${b?.firstName}`.toUpperCase().replace(/\s/g, "")
            return nameA?.localeCompare(nameB)
        })
        const newUser = Users.map((item, index) => ({
            ...item,
            key: index + 1
        }))
        return newUser
    }, [JSON.stringify(Users)])
    console.log("User", Users)
    useEffect(() => {
        Router.push("?active=true")
    }, [])

    return (
        <Table
            scroll={{
                y: "54vh",
                scrollToFirstRowOnChange: true
            }}
            columns={columns}
            dataSource={newUser}
        />
    )
}

export default App
