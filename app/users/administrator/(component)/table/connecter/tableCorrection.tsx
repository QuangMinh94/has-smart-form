"use client"
import { RevalidateTreeEProduct } from "@/app/(actions)/action"
import { addIntergration } from "@/app/(service)/connection"
import { RequestAddIntergration, corrections } from "@/app/(types)/Connecter"
import {
    useContextAdmin,
    useContextAdminAttachBu
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { Button, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEnvContext } from "next-runtime-env"
import React, { useMemo, useState } from "react"
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
                <Button onClick={show}>thêm</Button>
            )}
        </>
    )
}
const Btnsave = () => {
    const { NEXT_PUBLIC_ADD_INTEGRATION } = useEnvContext()
    const { token, session } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const {
        EproductActive,
        dataGlobal: { Connecter, Eproduct, Correction }
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
    console.log("body11111111111123", body)
    const handerSave = async () => {
        try {
            const res = await addIntergration({
                url: NEXT_PUBLIC_ADD_INTEGRATION!,
                session,
                token,
                bodyRequest: body
            })
            messageApi("success", "Gán nghiệp vụ thành công")
            await RevalidateTreeEProduct()
        } catch (err) {
            messageApi("error", "có lỗi")
        }
    }
    return (
        <Button onClick={handerSave} type="primary">
            Xác nhận gán
        </Button>
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
