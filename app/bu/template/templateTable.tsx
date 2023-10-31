"use client"

import DateFormatter from "@/app/(utilities)/DateFormatter"
import CustomLink from "@/components/CustomLink"
import Table, { ColumnsType } from "antd/es/table"

export type DataTableType = {
    key?: string
    formName?: string
    approval?: string
    validFrom?: any
    status?: string
}

const columns: ColumnsType<DataTableType> = [
    {
        title: "Tên biểu mẫu",
        dataIndex: "formName",
        align: "center",
        ellipsis: true,
        width: "6vw",
        render(_value, record, _index) {
            return (
                <span>
                    <CustomLink href={`/bu/template/${record.key}`}>
                        {record.formName!}
                    </CustomLink>
                    {/* <div className="block md:hidden">
                        <IssueStatusBadge status={record.status} />
                    </div> */}
                </span>
            )
        }
    },
    {
        title: "Người phê duyệt",
        dataIndex: "approval",
        align: "center",
        ellipsis: true,
        width: "6vw"
    },
    {
        title: "Ngày hiệu lực",
        dataIndex: "validFrom",
        align: "center",
        ellipsis: true,
        width: "6vw",
        render: (_value, record, _index) => {
            return <>{DateFormatter(record.validFrom.toString())}</>
        }
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        align: "center",
        ellipsis: true,
        width: "6vw",
        responsive: ["md"]
    },
    {
        title: "Hành động",
        key: "Edit",
        //dataIndex: 'action',
        align: "center",
        width: "5vw",
        fixed: "right",
        render: (_value, record, _index) => {
            return (
                <CustomLink href={`/bu/template/${record.key}`}>
                    Phê duyệt
                </CustomLink>
            )
        }
    }
]

const TemplateTable = ({ data }: { data: DataTableType[] }) => {
    return <Table dataSource={data} columns={columns}></Table>
}

export default TemplateTable