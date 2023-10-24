"use client"
import axios from "axios"
import React, { useState } from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import routers from "@/router/cusTomRouter"

interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
}

const columns: ColumnsType<DataType> = [
    {
        title: "Id",
        dataIndex: "key",
        render: (key: string) => (
            <Link href={routers.detailMywork.path({ id: key })}>{key}</Link>
        )
    },
    {
        title: "Name",
        dataIndex: "name",
        render: (text: string) => <a>{text}</a>
    },
    {
        title: "Age",
        dataIndex: "age"
    },
    {
        title: "Address",
        dataIndex: "address"
    }
]

const data: DataType[] = []

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        )
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
    })
}

for (let i = 0; i <= 100; i++) {
    data.push({ key: i, name: `name${i}`, age: i, address: `address${i}` })
}

const App: React.FC = () => {
    
   

 
    return (
       
            <div>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection
                    }}
                    scroll={{
                        y: 400,
                        scrollToFirstRowOnChange: true
                    }}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "30"]
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        
    )
}

export default App
