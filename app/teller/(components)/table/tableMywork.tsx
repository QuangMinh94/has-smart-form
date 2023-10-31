"use client"
import axios from "axios"
import React, { useMemo, useCallback } from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import routers from "@/router/cusTomRouter"
import { myWork } from "@/app/(types)/teller/mywork"
import dayjs from "dayjs"
import { useContextMyWork } from "@/components/cusTomHook/useContext"
import { useRouter } from "next/navigation"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"

type Props = {
    data: myWork[]
}
const App: React.FC<Props> = ({ data }) => {
    const { setDataGlobal } = useContextMyWorkDetail()
    const { setListIdRemove } = useContextMyWork()
    const router = useRouter()
    const CustomClickPath = useCallback((row: myWork) => {
       
        setDataGlobal({
            repository: row?.eProduct?.name as string,
            appointment: row?.appointmentCode
        })
        router.push(
            `${routers.detailMywork.path({
                id: row._id ?? ""
            })}?CCCD=${row?.citizenId}&Name=${row.name}`
        )
    }, [])
    const rowSelection = useMemo(
        () => ({
            onChange: (selectedRowKeys: React.Key[]) => {
                console.log(selectedRowKeys)
                setListIdRemove(selectedRowKeys)
            }
        }),
        []
    )
    const columns: ColumnsType<myWork> = [
        {
            title: "Mã giao dịch",

            render: (row: myWork) => (
                <div onClick={() => CustomClickPath(row)}>{row._id}</div>
            )
        },
        {
            title: "CCCD",
            render: (row: myWork) => (
                <div onClick={() => CustomClickPath(row)}>{row?.citizenId}</div>
            )
        },
        {
            title: "Người làm đơn",
            dataIndex: "name"
        },
        {
            title: "Sản phẩm",

            render: (row: myWork) => {
                return <>{row?.eProduct?.name}</>
            }
        },
        {
            title: "Ngày tạo",
            dataIndex: "createDate",
            render: (createDate) => {
                return dayjs(createDate).format("DD/MM/YYYY HH:mm:ss")
            },
            sorter: (a: myWork, b: myWork) => {
                if (dayjs(a.createDate).isAfter(b.createDate)) {
                    return 1
                }
                return -1
            }
        },
        {
            title: "Trạng thái",
            render: (row: myWork) => <>{row?.status?.name}</>
        },
        {
            title: "Người thực hiện",
            dataIndex: "implementer"
        }
    ]
    console.log(data)
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
