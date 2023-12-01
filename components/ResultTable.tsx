"use client"

import { Users } from "@/app/(types)/Users"
import { channel } from "@/app/(types)/channel"
import { eProduct } from "@/app/(types)/eProduct"
import { status } from "@/app/(types)/status"
import DateFormatter from "@/app/(utilities)/DateFormatter"
import { Skeleton, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import Link from "next/link"

export type ResultTableType = {
    key?: string
    departmentCode?: string
    appointmentCode?: string
    citizenId?: string
    name?: string
    eProduct?: eProduct
    channel?: channel
    createdDate?: Date
    status?: status
    executor?: Users
    officeBranch?: string
    ecmDocId?: string
    queryCode?: string
}

const ResultTable = ({
    data,
    route,
    prerender
}: {
    data: ResultTableType[]
    route: any
    prerender?: boolean
}) => {
    //const router = useRouter()

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
            render() {
                return <Skeleton.Input active />
            }
        }
    ]

    const columns: ColumnsType<ResultTableType> = [
        {
            title: "Mã đơn vị",
            dataIndex: "departmentCode",
            width: "8vw",
            render(_value, record, _index) {
                return (
                    <Link href={`${route}/${record.queryCode}`}>
                        {record.departmentCode}
                    </Link>
                )
            }
        },
        {
            title: "Mã giao dịch",
            dataIndex: "appointmentCode",
            width: "8vw"
        },
        {
            title: "CCCD",
            dataIndex: "citizenId",
            width: "8vw"
        },
        {
            title: "Người làm đơn",
            dataIndex: "name",
            width: "10vw"
        },
        {
            title: "Sản phẩm",
            dataIndex: "eProduct",
            width: "12vw",
            render(_value, record, _index) {
                return <>{record.eProduct?.name}</>
            }
        },
        {
            title: "Kênh",
            dataIndex: "channel",
            width: "8vw",
            render(_value, record, _index) {
                return <>{record.channel?.description}</>
            }
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate",
            width: "8vw",
            sorter: (a, b) => {
                if (a.createdDate && b.createdDate) {
                    return (
                        dayjs(b.createdDate).unix() -
                        dayjs(a.createdDate).unix()
                    )
                }
                return 0
            },

            render(_value, record, _index) {
                return (
                    <>
                        {record.createdDate
                            ? DateFormatter(record.createdDate.toString())
                            : ""}
                    </>
                )
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: "8vw",
            sorter: (a, b) =>
                a.status!.description!.localeCompare(b.status!.description!),
            render(_value, record, _index) {
                return <>{record.status?.description}</>
            }
        },
        {
            title: "Người thực hiện",
            dataIndex: "executor",
            width: "8vw",
            render(_value, record, _index) {
                return (
                    <>
                        {record.executor
                            ? record.executor.lastName +
                              " " +
                              record.executor.firstName
                            : ""}
                    </>
                )
            }
        },
        {
            title: "Đơn vị",
            dataIndex: "officeBranch",
            ellipsis: true
        }
    ]

    return (
        <Table
            className="mt-4"
            dataSource={data}
            columns={prerender ? skeletonColumns : columns}
            /*  onRow={(i) => ({
                onDoubleClick: (e) => router.push(route + i.key)
            })} */
            scroll={{
                y: "50vh",
                scrollToFirstRowOnChange: true
            }}
        />
    )
}

export default ResultTable
