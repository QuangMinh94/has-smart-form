"use client"

import React from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"

import routers from "@/router/cusTomRouter"
import { myWork } from "@/app/(types)/teller/mywork"
import dayjs from "dayjs"
import ButtonApprove from "@/app/ksvteller/(component)/ButonApprove"
import { useRouter } from "next/navigation"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
type Props = {
    data: myWork[]
}
const TableMyWork: React.FC<Props> = ({ data }) => {
    const { setDataGlobal } = useContextMyWorkDetail()
    const router = useRouter()
    const CustomClickPath = async (row: myWork) => {
        try {
            setDataGlobal({
                idEProduct: row?.eProduct?._id ?? "",
                nameEproduct: row?.eProduct?.name ?? ""
            })
            router.push(
                `${routers("ksvteller").detailMywork.path({
                    id: row?._id ?? ""
                })}?CCCD=${row?.citizenId}&Name=${row.name}&code=${
                    row.appointmentCode
                }`
            )
        } catch (e) {
            alert("error")
        }
    }
    const columns: ColumnsType<myWork> = [
        {
            key: "_id",
            title: "Mã giao dịch",
            render: (row: myWork) => (
                <div
                    className="cursor-pointer text-sky-500"
                    onClick={() => CustomClickPath(row)}
                >
                    {row.appointmentCode}
                </div>
            )
        },
        {
            key: "citizenId",
            title: "CCCD",
            render: (row: myWork) => (
                <div
                    className="cursor-pointer text-sky-500"
                    onClick={() => CustomClickPath(row)}
                >
                    {row?.citizenId}
                </div>
            )
        },
        {
            key: "name",
            title: "Người làm đơn",
            dataIndex: "name"
        },
        {
            key: "eProduct",
            title: "Sản phẩm",
            render: (row: myWork) => {
                return <>{row?.eProduct?.name}</>
            }
        },
        {
            key: "createDate",
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
            key: "status",
            title: "Trạng thái",
            render: (row: myWork) => <>{row?.status?.description}</>,
            sorter: (a: myWork, b: myWork) => {
                if (`${a?.status?.code}`.length > `${b?.status?.code}`.length) {
                    return 1
                }
                return -1
            }
        },
        {
            key: "implementer",
            title: "Người thực hiện",
            dataIndex: "implementer"
        },
        {
            width: "10%",
            align: "center",
            key: "action",
            title: "Hành Động",
            render: (row: myWork) => (
                <ButtonApprove
                    onClick={() => CustomClickPath(row)}
                    content="Duyệt"
                />
            )
        }
    ]

    return (
        <div>
            <Table
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

export default TableMyWork
