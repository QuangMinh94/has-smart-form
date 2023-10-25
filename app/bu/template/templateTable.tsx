"use client"

import { EformTemplate } from "@/app/(types)/EformTemplate"
import DateFormatter from "@/app/(utilities)/DateFormatter"
import CustomLink from "@/components/CustomLink"
import Table, { ColumnsType } from "antd/es/table"

type DataTableType = {
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
    }
]

const TemplateTable = ({ data }: { data: EformTemplate[] }) => {
    const _data: DataTableType[] = []
    data.forEach((element) => {
        _data.push({
            key: element._id,
            formName: element.name,
            approval: element.approver,
            validFrom: element.validFrom,
            status: element.status
        })
    })

    return <Table dataSource={_data} columns={columns}></Table>
}

export default TemplateTable
