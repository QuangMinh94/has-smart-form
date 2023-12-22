"use client"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { EncryptedString } from "@/app/(utilities)/Crypto"
import Router from "@/router/cusTomRouter"
import { Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import { useCookies } from "next-client-cookies"
import { useRouter } from "next/navigation"
import React from "react"
type Props = {
    data: EformTemplate[]
}
const TableBlock: React.FC<Props> = ({ data }) => {
    const router = useRouter()
    const cookies = useCookies()

    const columns: ColumnsType<EformTemplate> = [
        {
            key: "name",
            title: "Tên biểu mẫu",

            render(row: EformTemplate) {
                return (
                    <p
                        className="text-blue-600 cursor-pointer truncate ..."
                        onClick={() => {
                            const encryptedString = EncryptedString(row?._id!)
                            cookies.set("encryptedId", encryptedString)

                            router.push(Router("ba").blockDetail())
                        }}
                    >
                        <Tooltip title={row?.name!}>{row?.name!}</Tooltip>
                    </p>
                )
            }
        },
        {
            key: "approver",
            title: "Người phê duyệt",
            render: (row: EformTemplate) => {
                return `${row?.approver?.lastName ?? ""} ${
                    row?.approver?.firstName ?? ""
                }`
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
                if (dayjs(a?.createdDate).isAfter(b?.createdDate)) {
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

    return (
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
    )
}

export default TableBlock
