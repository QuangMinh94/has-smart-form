"use client"
import { RevalidateListConnecterManager } from "@/app/(actions)/action"
import {
    addOrUpdateConnection,
    testConnection
} from "@/app/(service)/connection"
import {
    RequestAddOrUpdateConnection,
    RequestTestConnection,
    Requestauthen,
    connnector
} from "@/app/(types)/Connecter"
import { authenInfoFieldHeader } from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { parametter } from "@/app/(types)/formFiled/FormConnectManager/parametter"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import FiledAuthenInfo from "@/app/users/administrator/(component)/ModalFiledForm/connecterManager/AuthenInfo"
import FiledParametter from "@/app/users/administrator/(component)/ModalFiledForm/connecterManager/Parametter"
import {
    useContextAdmin,
    useContextAdminconnectManager
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import SelectForm from "@/components/selector/SelectForm"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row, Select } from "antd"
import { useEnvContext } from "next-runtime-env"
import React, { memo, useCallback, useEffect, useState } from "react"
const { TextArea } = Input
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    rowData: connnector
    CancelModalParent?: () => void
}
type FiledForm = {
    categoryConnecter: string
    categoryMethod: string
    categoryapi: string
    datatest: string
    description: string
    nameConnecter: string
    url: string
}
const FormGroup: React.FC<Props> = ({
    CancelModal,
    typeForm,
    rowData,
    CancelModalParent
}) => {
    const {
        NEXT_PUBLIC_ADD_CONNECTION,
        NEXT_PUBLIC_TEST_CONNECTION,
        NEXT_PUBLIC_UPDATE_CONNECTION
    } = useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const [loadingtestConnection, setLoadingtestConnection] =
        useState<boolean>(false)
    const {
        setDataForm,
        DataForm: { authenInfo, parametter }
    } = useContextAdminconnectManager()
    // const [active, setActive] = useState<boolean>(
    //     typeForm === "UPDATE_MODAL" ? !!rowData?.active : true
    // )

    useEffect(() => {
        if (typeForm === "ADD_MODAL") {
            setDataForm({
                parametter: [],
                authenInfo: {
                    header: [],
                    body: [],
                    fieldsHeader: [],
                    textInfo: {}
                }
            })
        }
        if (typeForm === "UPDATE_MODAL") {
            const authen = rowData?.authenInfo ?? {}
            const parametter: parametter[] =
                rowData?.params?.map((param) => ({
                    field: param
                })) ?? []
            const fieldsHeader: authenInfoFieldHeader[] =
                rowData?.authenInfo?.fieldsHeader?.map((field) => ({
                    name: field
                })) ?? []

            setDataForm({
                parametter: parametter,
                authenInfo: {
                    header: authen.headers ?? [],
                    body: authen?.body ?? [],
                    fieldsHeader: fieldsHeader ?? [],

                    textInfo: {
                        type: authen?.type,
                        method: authen?.method,
                        urlToken: authen?.urlToken,
                        fieldToken: authen?.fieldToken
                    }
                }
            })
        }
    }, [])
    const onFinish = (data: FiledForm) => {
        if (!isJSON(data.datatest)) {
            messageApi(
                "error",
                "vui lòng nhập đúng định dạng JSON cho datatest"
            )
            return
        }
        const textInfoAuthen = authenInfo?.textInfo
        const body = authenInfo.body.map((item) => ({
            name: item?.name,
            value: item?.value,
            description: item?.description
        }))
        const fieldsHeader = authenInfo.fieldsHeader.map(
            (field) => field?.name ?? ""
        )
        const headers = authenInfo.header.map((item) => ({
            name: item?.name,
            value: item?.value,
            description: item?.description
        }))
        const params = parametter.map((item) => item?.field ?? "")
        const authen: Requestauthen = {
            body,
            headers,
            type: textInfoAuthen?.type,
            method: textInfoAuthen?.method,
            urlToken: textInfoAuthen?.urlToken,
            fieldToken: textInfoAuthen?.fieldToken,
            fieldsHeader
        }
        if (headers?.length <= 0) {
            delete authen.headers
        }
        if (fieldsHeader?.length <= 0) {
            delete authen.fieldsHeader
        }
        const bodyRequest: RequestAddOrUpdateConnection = {
            dataTest: data?.datatest ? JSON.parse(data?.datatest) : {},
            authenInfo: authen,
            params,
            method: data.categoryMethod,
            url: data.url,
            connectorType: data.categoryapi,
            connectorGroup: data.categoryConnecter,
            name: data.nameConnecter,
            description: data.description,
            active: true
        }

        if (typeForm === "ADD_MODAL") {
            HanderAddConnecter(bodyRequest)
        }
        if (typeForm === "UPDATE_MODAL") {
            bodyRequest.id = rowData._id
            delete bodyRequest.connectorType
            HanderUpdateConnecter(bodyRequest)
            // update(bodyRequest)
        }
    }
    const HanderAddConnecter = async (body: RequestAddOrUpdateConnection) => {
        setLoadingBtn(true)
        try {
            const res = await addOrUpdateConnection({
                url: NEXT_PUBLIC_ADD_CONNECTION!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                await RevalidateListConnecterManager()
                CancelModal()
                if (CancelModalParent) {
                    CancelModalParent()
                }
                messageApi("success", "Thêm mới  thành công")
            }
        } catch (e: any) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }
    const HanderUpdateConnecter = async (
        body: RequestAddOrUpdateConnection
    ) => {
        setLoadingBtn(true)
        try {
            const res = await addOrUpdateConnection({
                url: NEXT_PUBLIC_UPDATE_CONNECTION!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                await RevalidateListConnecterManager()
                CancelModal()
                if (CancelModalParent) {
                    CancelModalParent()
                }
                messageApi("success", "Cập nhật thành công")
            }
        } catch (e: any) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }

    function isJSON(str: string) {
        if (!str) {
            return true
        }
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            return false
        }
    }
    const HanderleTestConnection = async () => {
        if (!isJSON(form.getFieldValue("datatest"))) {
            messageApi(
                "error",
                "vui lòng nhập đúng định dạng JSON cho datatest"
            )
            return
        }

        const method = form.getFieldValue("categoryMethod")
        const url = form.getFieldValue("url")
        const dataTest = form.getFieldValue("datatest")
            ? JSON.parse(form.getFieldValue("datatest"))
            : form.getFieldValue("datatest")

        const connectorType = form.getFieldValue("categoryapi")
        const textInfoAuthen = authenInfo?.textInfo
        const body = authenInfo.body.map((item) => ({
            name: item?.name,
            value: item?.value,
            description: item?.description
        }))
        const fieldsHeader = authenInfo.fieldsHeader.map(
            (field) => field?.name ?? ""
        )
        const authen: Requestauthen = {
            body,
            type: textInfoAuthen?.type,
            method: textInfoAuthen?.method,
            urlToken: textInfoAuthen?.urlToken,
            fieldToken: textInfoAuthen?.fieldToken,
            fieldsHeader
        }
        const Request: RequestTestConnection = {
            method,
            url,
            dataTest,
            connectorType,
            authenInfo: authen
        }
        setLoadingtestConnection(true)
        try {
            const res = await testConnection({
                url: NEXT_PUBLIC_TEST_CONNECTION!,
                session,
                token,
                bodyRequest: Request
            })
            console.log(res)
            messageApi("success", "kết nối thành công")
            setLoadingtestConnection(false)
        } catch (e: any) {
            setLoadingtestConnection(false)
            console.log("e", e.response.data)
            const { type, data, code, name } = e?.response?.data
            const err = data?.[0]

            if (type === "VALIDATION_ERROR") {
                if (err?.type === "required") {
                    if (err?.field === "method") {
                        messageApi("error", "Vui lòng chọn phương thức")
                    } else if (err?.field === "url") {
                        messageApi("error", "Vui lòng nhập đường dẫn")
                    } else if (err?.field === "connectorType") {
                        messageApi("error", "Vui lòng chọn loại kết nối")
                    } else if (err?.field === "dataTest") {
                        messageApi("error", "Vui lòng nhập dataTest")
                    } else if (err?.field === "type") {
                        messageApi("error", "Vui lòng nhập type cho authenInfo")
                    } else if (err?.field === "urlToken") {
                        messageApi(
                            "error",
                            "Vui lòng nhập urlToken cho authenInfo"
                        )
                    } else if (err?.field === "method") {
                        messageApi(
                            "error",
                            "Vui lòng nhập method cho authenInfo"
                        )
                    } else if (err?.field === "fieldToken") {
                        messageApi(
                            "error",
                            "Vui lòng nhập fieldToken cho authenInfo"
                        )
                    } else {
                        messageApi("error", "có lỗi")
                    }
                    return
                }
                if (err?.type === "object") {
                    if (err?.field === "dataTest") {
                        messageApi(
                            "error",
                            "Vui lòng nhập định dạng JSON kiểu object cho data test"
                        )
                    } else if (err?.field === "body") {
                        messageApi(
                            "error",
                            "Vui lòng chọn định  kiểu object cho body"
                        )
                    } else {
                        messageApi("error", "có lỗi")
                    }
                    return
                }
                if (err?.type === "stringEnum") {
                    if (err?.field === "type") {
                        messageApi("error", "type authenInfo không hợp lệ")
                    } else if (err?.field === "body") {
                        messageApi(
                            "error",
                            "Vui lòng chọn định dạng  kiểu object cho body"
                        )
                    } else {
                        messageApi("error", "có lỗi")
                    }
                    return
                }
                if (err?.type === "arrayMin") {
                    if (err?.field === "fieldsHeader") {
                        messageApi(
                            "error",
                            "vui lòng không để trống fieldsHeader của authen"
                        )
                    } else {
                        messageApi("error", "có lỗi")
                    }
                    return
                }
                messageApi("error", "có lỗi")
            } else if (
                (code === 404 && type === "ERR_BAD_REQUEST") ||
                (code === 500 && name === "TypeError")
            ) {
                messageApi("error", "vui lòng chọn đường dẫn  khác")
            } else {
                messageApi("error", "có lỗi")
            }
        }
    }

    const HandlerOnchangeCategoryApi = useCallback((value: string) => {
        form.setFieldsValue({ categoryapi: value })
    }, [])
    const HandlerOnchangeCategoryMethod = useCallback((value: string) => {
        form.setFieldsValue({ categoryMethod: value })
    }, [])

    const HandlerOnchangeCategoryConnecter = useCallback((value: string) => {
        form.setFieldsValue({ categoryConnecter: value })
    }, [])
    console.log("rowData", rowData)

    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                layout="vertical"
                initialValues={
                    typeForm === "UPDATE_MODAL"
                        ? {
                              categoryMethod: rowData.method,
                              categoryapi: rowData.connectorType,
                              categoryConnecter: rowData.connectorGroup,
                              datatest: JSON.stringify(rowData?.dataTest),

                              description: rowData.description,
                              nameConnecter: rowData.name,

                              url: rowData.url
                          }
                        : { categoryConnecter: rowData.connectorGroup }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Tên connecter"
                            name="nameConnecter"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập Tên connecter"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Nhóm kết nối"
                            name="categoryConnecter"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng chọn nhóm kết nối"
                                }
                            ]}
                        >
                            {typeForm === "UPDATE_MODAL" ? (
                                <SelectForm
                                    enabledFecthData={
                                        typeForm === "UPDATE_MODAL"
                                    }
                                    type="getcategoriesConnecter"
                                    onChange={HandlerOnchangeCategoryConnecter}
                                />
                            ) : (
                                <Select
                                    options={[
                                        {
                                            label: rowData?.nameconnectorGroup,
                                            value: rowData?.connectorGroup
                                        }
                                    ]}
                                    disabled={true}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Phương thức"
                            name="categoryMethod"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng chọn phương thức"
                                }
                            ]}
                        >
                            <SelectForm
                                enabledFecthData={typeForm === "UPDATE_MODAL"}
                                type="getcategoriesMethods"
                                onChange={HandlerOnchangeCategoryMethod}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Loại kết nối"
                            name="categoryapi"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng chọn loại kết nối"
                                }
                            ]}
                        >
                            <SelectForm
                                disabled={typeForm === "UPDATE_MODAL"}
                                enabledFecthData={typeForm === "UPDATE_MODAL"}
                                type="getcategoriesApi"
                                onChange={HandlerOnchangeCategoryApi}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Đường dẫn"
                            name="url"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng chọn đường dẫn"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Data test"
                            name="datatest"
                        >
                            <TextArea
                                style={{ minHeight: "200px" }}
                                placeholder={'{"key": "value" }'}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            style={{ marginBottom: "25px" }}
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập mô tả"
                                }
                            ]}
                        >
                            <TextArea />
                        </Form.Item>
                        <div className="mb-[25px] ">
                            <FiledParametter />
                        </div>
                        <div className="mb-[25px] ">
                            <FiledAuthenInfo />
                        </div>
                    </Col>
                </Row>
                <div className="my-[25px] flex ">
                    <div className="flex-1">
                        <Button
                            loading={loadingtestConnection}
                            style={{ marginLeft: "10px" }}
                            onClick={HanderleTestConnection}
                        >
                            TestConnection
                        </Button>
                    </div>
                    <Button type="primary" onClick={CancelModal} danger>
                        Hủy
                    </Button>
                    <div className="ml-[10px]">
                        <Button
                            icon={
                                typeForm === "ADD_MODAL" ? (
                                    <PlusOutlined />
                                ) : undefined
                            }
                            loading={loadingBtn}
                            type="primary"
                            htmlType="submit"
                        >
                            {typeForm === "ADD_MODAL"
                                ? "Thêm Kết nối"
                                : "Lưu thông tin"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(FormGroup)
