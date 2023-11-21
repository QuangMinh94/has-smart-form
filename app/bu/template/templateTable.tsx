"use client"

import { EncryptedString } from "@/app/(utilities)/Crypto"
import DateFormatter from "@/app/(utilities)/DateFormatter"
import CustomLink from "@/components/CustomLink"
import { Skeleton, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table"
import { useCookies } from "next-client-cookies"
import { usePathname, useRouter } from "next/navigation"

export type DataTableType = {
    key?: string
    formName?: string
    approval?: string
    validFrom?: any
    status?: string
}

const TemplateTable = ({
    data,
    ksvPermission,
    readOnly,
    prerender
}: {
    data: DataTableType[]
    ksvPermission: boolean
    readOnly: boolean
    prerender?: boolean
}) => {
    const pathName = usePathname()
    const router = useRouter()
    const cookies = useCookies()
    const skeletonColumns: ColumnsType<DataTableType> = [
        {
            title: "Tên biểu mẫu",
            dataIndex: "formName",
            //ellipsis: true,
            width: "6vw",
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            title: "Người phê duyệt",
            dataIndex: "approval",
            align: "center",
            ellipsis: true,
            width: "6vw",
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            title: "Ngày hiệu lực",
            dataIndex: "validFrom",
            align: "center",
            ellipsis: true,
            width: "6vw",
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            align: "center",
            ellipsis: true,
            width: "6vw",
            responsive: ["md"],
            sorter: (a, b) => a.status!.localeCompare(b.status!),
            render() {
                return <Skeleton.Input active />
            }
        },
        {
            ...(ksvPermission && !pathName.includes("/bu/template")
                ? {
                      title: "Hành động",
                      key: "Edit",
                      //dataIndex: 'action',
                      align: "center",
                      width: "5vw",
                      fixed: "right",
                      render() {
                          return <Skeleton.Input active />
                      }
                  }
                : {
                      width: "0vw"
                  })
        }
    ]

    const columns: ColumnsType<DataTableType> = [
        {
            title: "Tên biểu mẫu",
            dataIndex: "formName",
            //ellipsis: true,
            width: "6vw",
            render(_value, record, _index) {
                if (!readOnly) {
                    return (
                        <CustomLink href={`/bu/template/${record.key}`}>
                            <p className="truncate ...">
                                <Tooltip title={record.formName!}>
                                    {record.formName!}
                                </Tooltip>
                            </p>
                        </CustomLink>
                    )
                }
                return (
                    <p
                        className="text-blue-600 cursor-pointer truncate ..."
                        onClick={() => {
                            const encryptedString = EncryptedString(record.key!)
                            cookies.set("encryptedId", encryptedString)
                            router.push("/bu/template/details")
                        }}
                    >
                        <Tooltip title={record.formName!}>
                            {record.formName!}
                        </Tooltip>
                    </p>
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
            responsive: ["md"],
            sorter: (a, b) => a.status!.localeCompare(b.status!)
        },
        {
            ...(ksvPermission && !pathName.includes("/bu/template")
                ? {
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
                : {
                      width: "0vw"
                  })
        }
    ]

    return (
        <Table
            dataSource={data}
            columns={prerender ? skeletonColumns : columns}
        ></Table>
    )
}

export default TemplateTable
