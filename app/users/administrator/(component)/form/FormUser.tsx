"use client"
import React, { memo, useCallback, useState, useEffect } from "react"
import { BodyUserRequest, Users } from "@/app/(types)/Users"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { addUser, updateUser } from "@/app/(service)/User"

import type { RangePickerProps } from "antd/es/date-picker"
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    DatePicker,
    Checkbox
} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useEnvContext } from "next-runtime-env"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import dayjs from "dayjs"
import SelectForm, { typeSelect } from "@/components/SelectForm"
import { RevalidateListUser } from "@/app/(actions)/action"
import {
    useContextAdmin,
    useContextAdminUser
} from "@/components/cusTomHook/useContext"

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    rowData: Users
    isUploadNotApi?: boolean
}
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs()
}
const FormOder: React.FC<Props> = ({
    CancelModal,
    typeForm,
    rowData,
    isUploadNotApi
}) => {
    const { NEXT_PUBLIC_ADD_USER, NEXT_PUBLIC_UPDATE_USER } = useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    // const { InFoUser } = useGetInfoUser()
    const { messageApi } = useContextAdmin()
    const { dataGlobal, setDataGlobal } = useContextAdminUser()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const [idDepartment, setIdDepartment] = useState<string>(
        `${typeForm === "UPDATE_MODAL" ? rowData?.department?._id : ""}`
    )
    const [active, setActive] = useState<boolean>(
        typeForm === "UPDATE_MODAL" ? !!rowData?.active : true
    )
    const [labels, setLabels] = useState<{
        authen: string
        department: string

        defaultGroup: string
    }>({
        authen: rowData?.authenProvider?.Name,
        department: rowData?.department?.name ?? "",
        defaultGroup: rowData?.defaultGroup?.name ?? ""
    })

    const onFinish = (data: any) => {
        const bodyUserRequest: BodyUserRequest = {
            userName: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            department: data.department,
            mail: data.email,
            phone: data.phoneNumber,
            authenProvider: data.auth,
            group: data.groups,
            defaultGroup: data.group,
            active: active,
            color: "#fff"
        }

        if (isUploadNotApi) {
            if (typeForm === "UPDATE_MODAL") {
                bodyUserRequest.id = rowData?._id

                setDataGlobal((data) => {
                    const DataUploadUsers = data.DataUploadUsers

                    const index = DataUploadUsers.findIndex(
                        (data) => data._id === bodyUserRequest.id
                    )

                    const dataUpload: Users = {
                        userName: bodyUserRequest.userName,
                        group: bodyUserRequest?.group?.map((item) => ({
                            _id: item
                        })),
                        defaultGroup: {
                            _id: `${bodyUserRequest?.defaultGroup}`,
                            name: labels.defaultGroup
                        },
                        department: {
                            _id: `${bodyUserRequest?.department}`,
                            name: labels.department
                        },

                        firstName: bodyUserRequest.firstName,
                        lastName: bodyUserRequest.lastName,
                        mail: bodyUserRequest.mail,
                        phone: bodyUserRequest.phone
                    }

                    DataUploadUsers[index] = {
                        ...DataUploadUsers[index],
                        ...dataUpload
                    }
                    CancelModal()
                    messageApi("success", "Cập nhật thành công")
                    return { ...data, DataUploadUsers }
                })
            }
        } else {
            if (typeForm === "ADD_MODAL") {
                addUserFC(bodyUserRequest)
            }
            if (typeForm === "UPDATE_MODAL") {
                bodyUserRequest.id = rowData?._id
                delete bodyUserRequest.authenProvider
                delete bodyUserRequest.color
                delete bodyUserRequest.userName
                updateUserFC(bodyUserRequest)
            }
        }
    }
    const addUserFC = async (body: BodyUserRequest) => {
        setLoadingBtn(true)
        try {
            const res = await addUser({
                url: NEXT_PUBLIC_ADD_USER!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                await RevalidateListUser()
                CancelModal()
                messageApi("success", "Thêm mới tài khoản thành công")
            }
        } catch (e: any) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }
    const updateUserFC = async (body: BodyUserRequest) => {
        setLoadingBtn(true)
        try {
            const res = await updateUser({
                url: NEXT_PUBLIC_UPDATE_USER!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                await RevalidateListUser()
                CancelModal()
                messageApi("success", "Cập nhật thành công")
            }
        } catch (e: any) {
            console.log("err", e)
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }
    const HandlerOnchangeAuth = useCallback((value: string) => {
        form.setFieldsValue({ auth: value })
    }, [])
    const HandlerOnchangeDepartment = useCallback((value: string) => {
        form.setFieldsValue({ department: value, group: "", groups: [] })
        setIdDepartment(value)
    }, [])
    const HandlerOnchangeGroup = useCallback((value: string) => {
        form.setFieldsValue({ group: value })
    }, [])
    const HandlerOnchangeGroups = useCallback((value: string[]) => {
        form.setFieldsValue({ groups: value })
    }, [])
    const CbOnSelect = (dataRow: any, type?: typeSelect) => {
        const name: string = `${dataRow?.label}`
        setLabels((lables) => {
            const obj: any = {
                authen: { authen: name },
                department: { department: name },
                groups: { groups: name },
                defaultGroup: { defaultGroup: name }
            }
            const update = obj[`${type}`]
            return { ...lables, ...update }
        })
    }
    const HandlerOnSelectAuthen = useCallback(
        (selectedKeys: string, dataRow: any) => {
            CbOnSelect(dataRow, "authen")
        },
        []
    )
    const HandlerOnSelectGroup = useCallback(
        (selectedKeys: string, dataRow: any) => {
            console.log("ok", dataRow)
            CbOnSelect(dataRow, "defaultGroup")
        },
        []
    )
    const HandlerOnSelectDepartment = useCallback(
        (selectedKeys: string, dataRow: any) => {
            console.log("ok", dataRow)
            CbOnSelect(dataRow, "department")
        },
        []
    )

    console.log("rowData", rowData)
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
                              auth: rowData?.authenProvider?._id,
                              username: rowData?.userName,
                              email: rowData?.mail,
                              lastName: rowData?.lastName,
                              firstName: rowData?.firstName,
                              birthDay: rowData.birthday
                                  ? dayjs(rowData.birthday)
                                  : "",
                              phoneNumber: rowData?.phone,
                              department: rowData?.department?._id,
                              group: rowData?.defaultGroup?._id,
                              groups: rowData?.group?.map((item) => item?._id)
                          }
                        : {}
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Authen Provider"
                    name="auth"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập tên đăng nhập"
                        }
                    ]}
                >
                    <SelectForm
                        enabledFecthData={typeForm === "UPDATE_MODAL"}
                        type="getAuth"
                        onSelect={
                            isUploadNotApi ? HandlerOnSelectAuthen : undefined
                        }
                        onChange={HandlerOnchangeAuth}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập tên đăng nhập"
                        },
                        {
                            validator(rule, value) {
                                const checkUsername = dataGlobal.Users.some(
                                    (user) =>
                                        user.userName
                                            ?.toLowerCase()
                                            .replace(/\s/g, "") ===
                                        value?.toLowerCase().replace(/\s/g, "")
                                )
                                if (
                                    checkUsername &&
                                    (isUploadNotApi || typeForm === "ADD_MODAL")
                                ) {
                                    return Promise.reject(
                                        "Tên đăng nhập đã có người sử dụng!"
                                    )
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input
                        disabled={
                            typeForm === "UPDATE_MODAL" && !isUploadNotApi
                        }
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "Vui lòng nhập đúng định dạng E-mail!"
                        },
                        {
                            required: true,
                            message: "Vui lòng nhập E-mail!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Tên"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập  Tên!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Họ đệm"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập Họ đệm"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Ngày sinh"
                    name="birthDay"
                    // rules={[
                    //     {
                    //         type: "object" as const,
                    //         required: true,
                    //         message: "vui lòng nhập ngày sinh!"
                    //     }
                    // ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format={["DD/MM/YYYY"]}
                        disabledDate={disabledDate}
                    />
                </Form.Item> */}
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập số điện thoại!"
                        }
                    ]}
                >
                    <InputNumber
                        onChange={(value) => {
                            form.setFieldsValue({
                                phoneNumber: `${value ?? ""}`
                            })
                        }}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Đơn vị"
                    name="department"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn đơn vị"
                        }
                    ]}
                >
                    <SelectForm
                        enabledFecthData={typeForm === "UPDATE_MODAL"}
                        type="getDepartment"
                        onChange={HandlerOnchangeDepartment}
                        onSelect={
                            isUploadNotApi
                                ? HandlerOnSelectDepartment
                                : undefined
                        }
                    />
                </Form.Item>

                {idDepartment && (
                    <Form.Item
                        style={{ marginBottom: "25px" }}
                        label="Thuộc nhóm"
                        name="groups"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Vui lòng chọn nhóm chức vụ",
                                type: "array"
                            }
                        ]}
                    >
                        <SelectForm
                            enabledFecthData={typeForm === "UPDATE_MODAL"}
                            mode="multiple"
                            idDepartment={idDepartment}
                            type="getGroup"
                            onChange={HandlerOnchangeGroups}
                        />
                    </Form.Item>
                )}
                {idDepartment && (
                    <Form.Item
                        style={{ marginBottom: "25px" }}
                        label="Chức vụ"
                        name="group"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Vui lòng chọn chức vụ"
                            }
                        ]}
                    >
                        <SelectForm
                            enabledFecthData={typeForm === "UPDATE_MODAL"}
                            idDepartment={idDepartment}
                            type="getGroup"
                            onChange={HandlerOnchangeGroup}
                            onSelect={
                                isUploadNotApi
                                    ? HandlerOnSelectGroup
                                    : undefined
                            }
                        />
                    </Form.Item>
                )}
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
                        disabled={isUploadNotApi}
                        checked={active}
                        onChange={(e) => {
                            setActive(e.target.checked)
                        }}
                    />
                </Form.Item>
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
                                ? "Thêm tài khoản"
                                : "Lưu thông tin"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(FormOder)
