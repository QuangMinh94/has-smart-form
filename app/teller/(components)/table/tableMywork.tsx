"use client"
import axios from "axios"
import React from "react"
import { Table } from "antd"
import type { ColumnsType} from "antd/es/table"
import Link from "next/link"
import routers from "@/router/cusTomRouter"
import { myWork } from "@/app/(types)/teller/mywork"
import dayjs from "dayjs"

const columns: ColumnsType<myWork> = [
    {
        title: "Mã giao dịch",
        dataIndex: "_id",
        render: (key: string) => (
            <Link
                href={`${routers.detailMywork.path({
                    id: key
                })}?CCCD=1&Name=hoang`}
            >
                {key}
            </Link>
        )
    },
    {
        title: "CCCD",
        dataIndex: "cddd",
        render: (cddd: string) => (
            <Link
                href={`${routers.detailMywork.path({
                    id: cddd
                })}?CCCD=1&Name=hoang`}
            >
                {cddd}
            </Link>
        )
    },
    {
        title: "Người làm đơn",
        dataIndex: "applicant"
    },
    {
        title: "Sản phẩm",
        dataIndex: "product"
    },
    {
        title: "Ngày tạo",
        dataIndex: "creatDate",
        render: (creatDate) => {
            return dayjs(creatDate).format("DD/MM/YYYY")
        },
        sorter: (a: myWork, b: myWork) => {
            if (dayjs(a.creatDate).isAfter(b.creatDate)) {
                return 1
            }
            return -1
        }
    },
    {
        title: "Trạng thái",
        dataIndex: "status"
    },
    {
        title: "Người thực hiện",
        dataIndex: "implementer"
    }
]

const data: myWork[] = []

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: myWork[]) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        )
    },
    getCheckboxProps: (record: myWork) => ({
        disabled: record.applicant === "Disabled User", // Column configuration not to be checked
        name: record.applicant
    })
}

for (let i = 0; i <= 5; i++) {
    data.push({
        key: `${i}`,
        _id: `${i}`,
        cddd: `cddd${i}`,
        applicant: `applicant${i}`,
        product: `product ${i}`,
        creatDate: `${dayjs().toISOString()}`,
        status: `status ${i}`,
        implementer: `implementer${i}`
    })
}
console.log(data)

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
