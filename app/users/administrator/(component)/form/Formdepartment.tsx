"use client"
import React, { memo, useCallback, useState, useMemo, useEffect } from "react"
import { Department } from "@/app/(types)/Department"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { Button, Form, Input, Checkbox } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useEnvContext } from "next-runtime-env"
import BtnModel, {
    typeForm
} from "@/app/users/administrator/(component)/BtnModal"
import SelectForm from "@/components/SelectForm"
import { RevalidateListDepartment } from "@/app/(actions)/action"
import { ObjIdChidrenParentPlat } from "./ObjIdParentPlats"
import {
    useContextAdmin,
    useContextTransferANTD
} from "@/components/cusTomHook/useContext"
import {
    addDepartment,
    updateDepartment,
    addUserToDepartment
} from "@/app/(service)/department"
import { bodyDepartmentRequest } from "@/app/(types)/Department"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    rowData: Department
    addTreeChidlren: boolean
}

const Formdepartment: React.FC<Props> = ({
    CancelModal,
    typeForm,
    rowData,
    addTreeChidlren
}) => {
    const {
        NEXT_PUBLIC_ADD_DEPARTMENT,
        NEXT_PUBLIC_ADD_USER_TO_DEPARTMENT,
        NEXT_PUBLIC_UPDATE_DEPARTMENT
    } = useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const { setTargetKeys, targetKeys } = useContextTransferANTD()
    const [active, setActive] = useState<boolean>(
        typeForm === "UPDATE_MODAL" ? !!rowData?.active : true
    )
    const [idParent, setIdParent] = useState<{
        idProvice: string
        idDistrict: string
    }>({
        idProvice: typeForm === "UPDATE_MODAL" ? `${rowData?.stage}` : "",
        idDistrict: typeForm === "UPDATE_MODAL" ? `${rowData?.distric}` : ""
    })

    useEffect(() => {
        setTargetKeys([])
    }, [])
    const onFinish = (data: {
        address: string
        category: string
        departmentParent: string
        district: string
        idBranch: string
        nameCategory: string
        province: string
        wards: string
    }) => {
        const bodyRequest: bodyDepartmentRequest = {
            name:
                data.nameCategory.charAt(0).toUpperCase() +
                data.nameCategory.slice(1),
            parent: data.departmentParent,
            active: active,
            type: data.category,
            code: data.idBranch,
            address: data.address,
            stage: data.province,
            distric: data.district,
            village: data.wards
        }

        if (typeForm === "ADD_MODAL") {
            if (!data.departmentParent) {
                delete bodyRequest.parent
            }
            addDepartmentFC(bodyRequest)
        }
        if (typeForm === "UPDATE_MODAL") {
            bodyRequest.id = rowData._id
            updateDepartmentFC(bodyRequest)
        }
    }
    const addDepartmentFC = async (body: bodyDepartmentRequest) => {
        setLoadingBtn(true)
        try {
            const resDepartment = await addDepartment({
                url: NEXT_PUBLIC_ADD_DEPARTMENT!,
                bodyRequest: body,
                token,
                session
            })
            if (resDepartment.status === 200) {
                if (targetKeys.length > 0) {
                    const resUserToDepartment = await addUserToDepartment({
                        url: NEXT_PUBLIC_ADD_USER_TO_DEPARTMENT!,
                        bodyRequest: {
                            department: resDepartment?.data._id,
                            userList: targetKeys
                        },
                        token,
                        session
                    })
                }
                await RevalidateListDepartment()
                CancelModal()
                messageApi("success", "Thêm mới đơn vị thành công")
            }
        } catch (e: any) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }
    const updateDepartmentFC = async (body: bodyDepartmentRequest) => {
        setLoadingBtn(true)
        try {
            const res = await updateDepartment({
                url: NEXT_PUBLIC_UPDATE_DEPARTMENT!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                await RevalidateListDepartment()
                CancelModal()
                messageApi("success", "Cập nhật thành công")
            }
        } catch (e: any) {
            console.log("err", e)
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }

    const HandlerOnchangeDepartment = useCallback((value: string) => {
        form.setFieldsValue({ departmentParent: value, group: "", groups: [] })
    }, [])

    const HandlerOnchangeCategory = useCallback(
        (value: string, option: any) => {
            form.setFieldsValue({ category: option.label })
        },
        []
    )

    const HandlerOnchangeProvince = useCallback((value: string) => {
        form.setFieldsValue({ province: value, district: "", wards: "" })
        setIdParent((data) => ({ ...data, idProvice: value }))
        if (!value) {
            setIdParent((data) => ({ ...data, idDistrict: "" }))
        }
    }, [])
    const HandlerOnchangeDistrict = useCallback((value: string) => {
        form.setFieldsValue({ district: value, wards: "" })
        setIdParent((data) => ({ ...data, idDistrict: value }))
    }, [])
    const HandlerOnchangeWards = useCallback((value: string) => {
        form.setFieldsValue({ wards: value })
    }, [])

    console.log("rowData", rowData)
    const objChidrenParentPlat = useMemo(() => {
        if (typeForm === "UPDATE_MODAL") {
            return ObjIdChidrenParentPlat(rowData)
        }
        return undefined
    }, [])

    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                style={{ maxWidth: 600 }}
                initialValues={
                    typeForm === "UPDATE_MODAL"
                        ? {
                              active: rowData.active,
                              address: rowData.address,
                              category: rowData.type,
                              departmentParent: rowData.parent?._id,
                              district: rowData.distric,
                              groups: rowData.organization,
                              idBranch: rowData.code,
                              nameCategory: rowData.name,
                              province: rowData.stage,
                              wards: rowData.village
                          }
                        : { departmentParent: rowData?._id }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Mã chi nhánh"
                    name="idBranch"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập mã chi nhánh"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Loại đơn vị"
                    name="category"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn loại đơn vị"
                        }
                    ]}
                >
                    <SelectForm
                        type="cateGoriFilter"
                        onChange={HandlerOnchangeCategory}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="tên đơn vị"
                    name="nameCategory"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn loại đơn vị"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập  địa chỉ!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Tỉnh thành"
                    name="province"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn tỉnh thành"
                        }
                    ]}
                >
                    <SelectForm
                        enabledFecthData={typeForm === "UPDATE_MODAL"}
                        type="getProvince"
                        onChange={HandlerOnchangeProvince}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Quận / huyện"
                    name="district"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn quận huyện"
                        }
                    ]}
                >
                    <SelectForm
                        disabled={!!!idParent.idProvice}
                        type="getDistrict"
                        onChange={HandlerOnchangeDistrict}
                        idParent={idParent.idProvice}
                    />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Phường / xã"
                    name="wards"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn phường xã"
                        }
                    ]}
                >
                    <SelectForm
                        disabled={!!!idParent.idDistrict}
                        type="getWards"
                        onChange={HandlerOnchangeWards}
                        idParent={idParent.idDistrict}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Chi nhánh cha"
                    name="departmentParent"
                    // rules={[
                    //     {
                    //         required: true,
                    //         whitespace: true,
                    //         message: "Vui lòng chọn chi nhánh cha"
                    //     }
                    // ]}
                >
                    <SelectForm
                        disabled={typeForm === "ADD_MODAL" && addTreeChidlren}
                        enabledFecthData={
                            typeForm === "UPDATE_MODAL" ||
                            (typeForm === "ADD_MODAL" && addTreeChidlren)
                        }
                        type="getDepartment"
                        onChange={HandlerOnchangeDepartment}
                        objcheck={objChidrenParentPlat}
                    />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Hoạt động"
                    name="active"
                    rules={[
                        {
                            type: "boolean"
                        }
                    ]}
                >
                    <Checkbox
                        checked={active}
                        onChange={(e) => {
                            setActive(e.target.checked)
                        }}
                    />
                </Form.Item>
                <div className="flex justify-center">
                    <BtnModel
                        type="TRANSFERFORM"
                        pathModel="ADMIN_DEPARTMENT"
                        typeFormTransfer={
                            typeForm === "UPDATE_MODAL"
                                ? "UPDATE_TRANSFER"
                                : "ADD_TRANSFER"
                        }
                        titleModel=""
                        rowData={rowData}
                    />
                </div>
                <div className="my-[25px] flex justify-end ">
                    <Button
                        type="primary"
                        style={{ minWidth: "100px" }}
                        onClick={CancelModal}
                        danger
                    >
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
                                ? "Thêm chi nhánh"
                                : "Lưu thông tin"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(Formdepartment)
