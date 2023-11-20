"use client"

import React from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import dayjs from "dayjs"

type Props = {
    data: EformTemplate[]
}
const TableBlock: React.FC<Props> = ({ data }) => {
    // const router = useRouter()

    // const CustomClickPath = async (row: myWork) => {
    //     try {
    //         setDataGlobal((data) => ({
    //             ...data,
    //             idEProduct: row?.eProduct?._id ?? "",
    //             nameEproduct: row?.eProduct?.name ?? ""
    //         }))
    //         router.push(
    //             `${routers("teller").detailMywork.path({
    //                 id: row?._id ?? ""
    //             })}?CCCD=${row?.citizenId}&Name=${row.name}&code=${
    //                 row.appointmentCode
    //             }`
    //         )
    //     } catch (e) {
    //         alert("error")
    //     }
    // }
    const columns: ColumnsType<EformTemplate> = [
        {
            key: "name",
            title: "Tên biểu mẫu",
            dataIndex: "name"
        },
        {
            key: "approver",
            title: "Người phê duyệt",
            render: (row: EformTemplate) => {
                return `${row.approver.lastName} ${row.approver.firstName}`
            }
        },

        {
            key: "createDate",
            title: "Ngày hiệu lực",
            dataIndex: "validFrom",
            render: (validFrom) => {
                return dayjs(validFrom).format("DD/MM/YYYY HH:mm:ss")
            },
            sorter: (a: EformTemplate, b: EformTemplate) => {
                if (dayjs(a.createdDate).isAfter(b.createdDate)) {
                    return 1
                }
                return -1
            }
        },
        {
            key: "status",
            title: "Trạng thái",
            render: (row: EformTemplate) => <>{row?.status?.description}</>,
            sorter: (a: EformTemplate, b: EformTemplate) => {
                if (`${a?.status?.code}`.length > `${b?.status?.code}`.length) {
                    return 1
                }
                return -1
            }
        }
    ]
    console.log("table", data)
    return (
        <div>
            <Table
                scroll={{
                    y: "60vh",
                    scrollToFirstRowOnChange: true
                }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "30"]
                }}
                columns={columns}
                dataSource={[...data].reverse()}
            />
        </div>
    )
}

export default TableBlock
