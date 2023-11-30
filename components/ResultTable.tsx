"use client"

import { Skeleton, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useCookies } from "next-client-cookies"
import { usePathname, useRouter } from "next/navigation"

export type ResultTableType = {
    key?: string
    departmentCode?: string
    appointmentCode?: string
    citizenId?: string
    name?: string
    eProduct?: string
    channel?: string
    createdDate?: Date
    status?: string
    executor?: string
    officeBranch?: string
}

const ResultTable = ({
    data,
    prerender
}: {
    data: ResultTableType[]
    prerender?: boolean
}) => {
    const pathName = usePathname()
    const router = useRouter()
    const cookies = useCookies()
    const skeletonColumns: ColumnsType<ResultTableType> = [
        {
            title: "Mã đơn vị",
            dataIndex: "formName",
            //ellipsis: true,
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            title: "Mã giao dịch",
            dataIndex: "approval",
            align: "center",
            ellipsis: true,
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            title: "CCCD",
            dataIndex: "validFrom",
            align: "center",
            ellipsis: true,
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            title: "Người làm đơn",
            dataIndex: "status",
            align: "center",
            ellipsis: true,
            responsive: ["md"],
            sorter: (a, b) => a.status!.localeCompare(b.status!),
            render() {
                return <Skeleton.Input active />
            }
        }
    ]

    const columns: ColumnsType<ResultTableType> = [
        {
            title: "Mã đơn vị",
            dataIndex: "departmentCode"
        },
        {
            title: "Mã giao dịch",
            dataIndex: "appointmentCode"
        },
        {
            title: "CCCD",
            dataIndex: "citizenId"
        },
        {
            title: "Người làm đơn",
            dataIndex: "name"
        },
        {
            title: "Sản phẩm",
            dataIndex: "eProduct"
        },
        {
            title: "Kênh",
            dataIndex: "channel"
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate"
        },
        {
            title: "Trạng thái",
            dataIndex: "status"
        },
        {
            title: "Người thực hiện",
            dataIndex: "executor"
        },
        {
            title: "Đơn vị",
            dataIndex: "officeBranch"
        }
    ]

    return (
        <Table
            className="mt-4"
            dataSource={data}
            columns={prerender ? skeletonColumns : columns}
            size="middle"
        />
    )
}

export default ResultTable
