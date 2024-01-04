"use client"
import { addIntergration } from "@/app/(service)/connection"
import { RequestAddIntergration, corrections } from "@/app/(types)/Connecter"
import Fillter from "@/app/users/administrator/(component)/ActionHeader/connecter/corection"
import { FecthIntergration } from "@/app/users/administrator/(component)/PopoverFindIntergaration"
import {
    useContextAdmin,
    useContextAdminAttachBu
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import SelectForm from "@/components/selector/SelectForm"
import { ToFilterName } from "@/util/formatText"
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Button,
    Col,
    Form,
    Input,
    Popconfirm,
    Row,
    Spin,
    Table,
    Typography
} from "antd"
import { useEnvContext } from "next-runtime-env"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { CustomEproduct } from "../../TreeCustome/CustomTreeAttachBusiness"
import FormCorrection from "../../form/connecter/FormCorrection"
const BtnCRUD = ({
    type,
    disable,
    record
}: {
    type: "ADD" | "REMOVE"
    disable: boolean
    record: any
}) => {
    const { setDataGlobal } = useContextAdminAttachBu()

    const [active, setActive] = useState<boolean>(false)
    const show = () => {
        setActive(true)
    }
    const hide = () => {
        setActive(false)
    }

    const confirm = (key: number) => {
        setDataGlobal((data) => {
            const Correction = data.Correction
            const index = Correction.findIndex(
                (item, index) => key - 1 === index
            )
            Correction.splice(index, 1)
            return { ...data, Correction }
        })
        hide()
    }
    const handleOpenChange = (newOpen: boolean) => {
        setActive(newOpen)
    }
    return (
        <>
            {type === "ADD" ? (
                <>
                    {" "}
                    {active ? (
                        <FormCorrection
                            typeForm="ADD_MODAL"
                            dataRow={{}}
                            CancelModal={hide}
                        />
                    ) : (
                        <Button disabled={disable} onClick={show}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    )}{" "}
                </>
            ) : (
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    open={active}
                    onOpenChange={handleOpenChange}
                    onConfirm={() => confirm(Number(record.key))}
                    onCancel={hide}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <FontAwesomeIcon
                        className="cursor-pointer hover:opacity-50"
                        icon={faTrashAlt}
                    />
                </Popconfirm>
            )}
        </>
    )
}
const Btnsave = () => {
    const { NEXT_PUBLIC_ADD_INTEGRATION } = useEnvContext()
    const { token, session } = useCustomCookies()
    const [loading, setLoading] = useState<boolean>(false)
    const { messageApi } = useContextAdmin()
    const {
        setDataGlobal,
        EproductActive,
        dataGlobal: { Connecter, Correction }
    } = useContextAdminAttachBu()
    const idCorrection = Connecter.filter((item) => item.checked)[0]?._id ?? ""
    const targetParams = Correction.map((item) => item.parametterConntion ?? "")
    const sourceParams = Correction.map((item) => item.attachBusiness ?? "")
    const dataType = Correction.map((item) => item?.type?.id ?? "")
    const body: RequestAddIntergration = {
        eProduct: EproductActive?._id ?? "",
        connection: idCorrection,
        mappingTable: {
            targetParams,
            sourceParams,
            dataType
        }
    }
    const updateEproduct = ({
        eProduct,
        idUpdate,
        idIntegrations
    }: {
        eProduct: CustomEproduct[]
        idUpdate: string
        idIntegrations: string
    }) => {
        for (let i = 0; i < eProduct.length; i++) {
            const item = eProduct[i]
            const children = item?.children
            if (item._id === idUpdate) {
                eProduct[i] = {
                    ...item,
                    connectionCount: Number(item.connectionCount) + 1
                }
                return
            }
            if (children && children?.length > 0) {
                updateEproduct({ eProduct: children, idUpdate, idIntegrations })
            }
        }
    }
    const handerSave = async () => {
        setLoading(true)
        try {
            const res = await addIntergration({
                url: NEXT_PUBLIC_ADD_INTEGRATION!,
                session,
                token,
                bodyRequest: body
            })
            const idIntegrations = res?.data?._id
            setDataGlobal((data) => {
                const eProduct = data.Eproduct
                updateEproduct({
                    eProduct,
                    idUpdate: body?.eProduct,
                    idIntegrations
                })
                return { ...data, Eproduct: eProduct }
            })
            // await RevalidateTreeEProduct()
            messageApi("success", "Gán nghiệp vụ thành công")
        } catch (err) {
            messageApi("error", "có lỗi")
        }
        setLoading(false)
    }
    return (
        <>
            {EproductActive?._id && idCorrection && (
                <Button loading={loading} onClick={handerSave} type="primary">
                    Xác nhận gán
                </Button>
            )}
        </>
    )
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    inputType: "select" | "text"
    record: corrections
    children: React.ReactNode
    onChangeSelection: (value: string, option: any) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    inputType,
    record,
    children,
    onChangeSelection,
    ...restProps
}) => {
    const inputNode =
        inputType === "select" ? (
            <SelectForm
                enabledFecthData={true}
                onChange={onChangeSelection}
                type="cateGoriFilterDataType"
                placeholder="Loại"
            />
        ) : (
            <Input />
        )
    const title =
        dataIndex === "attachBusiness"
            ? "Trường hệ thống"
            : dataIndex === "parametterConntion"
            ? "Trường kết nối địch"
            : "Kiểu dữ liệu"
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: dataIndex !== "description",
                            message: `Vui lòng không để trống ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}
const App: React.FC = () => {
    const praram = useSearchParams()

    const idEproduct = praram.get("eproduct")
    const {
        tab,
        setDataGlobal,
        FillterCorrection,
        dataGlobal: { Correction }
    } = useContextAdminAttachBu()
    const { data, refetch, isRefetching, isLoading, error } = FecthIntergration(
        {
            request: { eProduct: idEproduct ?? "" },
            key: idEproduct ?? "",
            enabled: false
        }
    )
    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState<number | null>(null)

    const isEditing = (record: corrections) => record.key === editingKey
    const [label, setLabel] = useState<string>("")

    useEffect(() => {
        if (idEproduct) {
            refetch()
        } else {
            setDataGlobal((data) => {
                return { ...data, Correction: [] }
            })
        }
    }, [idEproduct])
    useEffect(() => {
        if (data) {
            const TableMapping = data?.[0]?.mappingTable

            if (TableMapping) {
                const { sourceParams, targetParams, dataType } = TableMapping

                setDataGlobal((data) => {
                    const corrections: corrections[] = []
                    sourceParams?.forEach((item, index) => {
                        const target = targetParams?.[index]
                        const type = dataType?.[index]
                        corrections.push({
                            parametterConntion: item,
                            attachBusiness: target,
                            type: { id: type ?? "", name: type ?? "" }
                        })
                    })

                    return { ...data, Correction: corrections }
                })
            } else {
                setDataGlobal((data) => {
                    return { ...data, Correction: [] }
                })
            }
        }
    }, [isRefetching, isLoading])
    const onChangeSelection = useCallback((value: string, option: any) => {
        setLabel(option?.label)
        form.setFieldsValue({ type: value })
    }, [])

    const edit = (record: corrections) => {
        form.setFieldsValue({
            parametterConntion: "",
            attachBusiness: "",
            description: "",
            ...record,
            type: record.type?.id ?? ""
        })
        setLabel(record?.type?.name ?? "")
        setEditingKey(Number(record?.key))
    }
    const save = async (key: number) => {
        try {
            const row = (await form.validateFields()) as corrections
            console.log(row)
            setDataGlobal((data) => {
                const Correction = data.Correction
                const index = Correction.findIndex(
                    (item, index) => key - 1 === index
                )
                const id: any = row?.type ?? ""

                Correction.splice(index, 1, {
                    ...row,
                    type: { id, name: label }
                })
                return { ...data, Correction }
            })
            setEditingKey(null)
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo)
        }
    }

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "5vw",
            align: "center",
            key: "stt"
        },
        {
            title: "Trường trên hệ thống",
            key: "attachBusiness",
            dataIndex: "attachBusiness",
            editable: true
        },
        {
            title: "Trường kết nối đích",
            key: "parametterConntion",
            dataIndex: "parametterConntion",
            editable: true
        },
        {
            title: "Kiểu dữ liệu",
            key: "type",
            dataIndex: "type",
            editable: true,
            render: (type: any) => {
                return type?.name
            }
        },
        {
            title: "Mô tả",
            key: "description",
            dataIndex: "description",
            editable: true
        },
        {
            title: "action",
            key: "action",
            align: "center",
            width: 150,
            render: (record: corrections) => {
                const editable = isEditing(record)
                return (
                    <div className="flex items-center justify-center">
                        {editable ? (
                            <>
                                <Typography.Link
                                    onClick={() => save(Number(record.key))}
                                    style={{ marginRight: 8 }}
                                >
                                    Save
                                </Typography.Link>
                                <Typography.Link
                                    onClick={() => {
                                        setEditingKey(null)
                                    }}
                                    style={{ marginLeft: "5px" }}
                                >
                                    Cancel
                                </Typography.Link>
                            </>
                        ) : (
                            <>
                                <div className="mr-[10px]">
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            !editingKey && edit(record)
                                        }}
                                        icon={faEdit}
                                        className={`${
                                            !editingKey
                                                ? "cursor-pointer hover:opacity-50"
                                                : "cursor-not-allowed opacity-50"
                                        }`}
                                    />
                                </div>
                                {!editingKey ? (
                                    <BtnCRUD
                                        record={record}
                                        type="REMOVE"
                                        disable={!!editingKey}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="cursor-not-allowed opacity-50"
                                    />
                                )}
                            </>
                        )}
                    </div>
                )
            }
        }
    ]
    const dataCustom = useMemo(() => {
        return Correction.map((item, index) => ({
            ...item,
            key: index + 1
        })).filter((item) => {
            return FillterCorrection
                ? ToFilterName(
                      `${item.attachBusiness}${item.parametterConntion}${item?.type?.name}`
                  ).includes(ToFilterName(FillterCorrection))
                : true
        })
    }, [JSON.stringify(Correction), FillterCorrection])

    const mergedColumns: any = columns.map((col) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record: corrections) => ({
                record,
                inputType: col.dataIndex === "type" ? "select" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                onChangeSelection
            })
        }
    })
    if (isLoading && idEproduct) {
        return <Spin />
    }
    if (error) {
        return <div style={{ color: "red" }}>có lỗi, vui lòng thử lại sau</div>
    }
    return (
        <div style={{ overflow: "auto", height: "100vh" }}>
            <Row align={"middle"} style={{ marginBottom: "15px" }}>
                <Col span={22}>
                    <BtnCRUD record={{}} type="ADD" disable={!!editingKey} />
                </Col>
                <Col span={2}>
                    <div className="flex justify-end">
                        <Btnsave />
                    </div>
                </Col>
            </Row>
            <div className="my-[5px]">
                <Fillter />
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                    scroll={{
                        y: "54vh",
                        scrollToFirstRowOnChange: true
                    }}
                    columns={mergedColumns}
                    dataSource={dataCustom}
                />
            </Form>
        </div>
    )
}

export default App
