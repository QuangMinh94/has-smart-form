"use client"
import { addIntergration } from "@/app/(service)/connection"
import { RequestAddIntergration, corrections } from "@/app/(types)/Connecter"
import {
    useContextAdmin,
    useContextAdminAttachBu
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEnvContext } from "next-runtime-env"
import React, { useMemo, useState } from "react"
import { CustomEproduct } from "../../TreeCustome/CustomTreeAttachBusiness"
import FormCorrection from "../../form/connecter/FormCorrection"
const columns: ColumnsType<corrections> = [
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
        dataIndex: "attachBusiness"
    },
    {
        title: "Trường kết nối đích",
        key: "parametterConntion",
        dataIndex: "parametterConntion"
    },
    {
        title: "Mô tả",
        key: "parametterConntion",
        dataIndex: "parametterConntion"
    }
    // {
    //     title: "Loại kết nối",
    //     key: "type",
    //     render: (record: connnector) => {
    //         return `${record?.authenInfo?.type ?? ""}`
    //     }
    // },

    // {
    //     title: "Thay đổi lần cuối",
    //     key: "updateDate",
    //     render: (record: connnector) => {
    //         return dayjs(record?.updatedDate).format("DD/MM/YYYY HH:mm:ss")
    //     }
    // },
    // {
    //     title: "Chỉnh sửa",
    //     width: "8vw",
    //     align: "center",
    //     key: "edit",
    //     render: (record: connnector) => (
    //         <BtnModal
    //             titleModel="Sửa Connector"
    //             type="UPDATE_MODAL"
    //             pathModel="ADMIN_CONNECTER_MANAGER"
    //             rowData={record}
    //         />
    //     )
    // },
    // {
    //     title: "Kích hoạt",
    //     width: "8vw",
    //     align: "center",
    //     key: "active",
    //     render: (record: connnector) => (
    //         <BtnModal
    //             titleModel={`${
    //                 record.active
    //                     ? `hủy kết nối "${record.name}"`
    //                     : `kích hoạt kết nối "${record.name}"`
    //             }`}
    //             type="ACTIVE_MODAL"
    //             pathModel="ADMIN_CONNECTER_MANAGER"
    //             rowData={record}
    //             activeChecked={record.active}
    //         />
    //     )
    // }
]
const BtnCRUD = () => {
    const [active, setActive] = useState<boolean>(false)
    const show = () => {
        setActive(true)
    }
    const hide = () => {
        setActive(false)
    }
    return (
        <>
            {active ? (
                <FormCorrection
                    typeForm="ADD_MODAL"
                    dataRow={{}}
                    CancelModal={hide}
                />
            ) : (
                <Button onClick={show}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
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
    const body: RequestAddIntergration = {
        eProduct: EproductActive?._id ?? "",
        connection: idCorrection,
        mappingTable: {
            targetParams,
            sourceParams
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
                    integration: [...(item.integration ?? []), idIntegrations]
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
const App: React.FC = () => {
    const {
        dataGlobal: { Correction }
    } = useContextAdminAttachBu()
    const data = useMemo(() => {
        return Correction.map((item, index) => ({ ...item, key: index + 1 }))
    }, [JSON.stringify(Correction)])
    return (
        <>
            <Table
                scroll={{
                    y: "54vh",
                    scrollToFirstRowOnChange: true
                }}
                columns={columns}
                dataSource={data}
            />
            <div className="mt-[15px]">
                <BtnCRUD />
                <div className="mt-[20px]">
                    <Btnsave />
                </div>
            </div>
        </>
    )
}

export default App
