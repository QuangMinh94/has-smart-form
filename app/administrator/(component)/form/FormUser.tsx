"use client"
import React, { memo, useCallback, useState, useEffect } from "react"
import { BodyUserRequest, Users } from "@/app/(types)/Users"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { addUser, updateUser } from "@/app/(service)/User"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
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
import { typeForm } from "@/app/administrator/(component)/BtnModal"
import dayjs from "dayjs"
import SelectForm from "@/app/administrator/(component)/SelectForm"
import { RevalidateListUser } from "@/app/(actions)/action"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = { CancelModal: () => void; typeForm: typeForm; rowData: Users }
const FormOder: React.FC<Props> = ({ CancelModal, typeForm, rowData }) => {
    const { NEXT_PUBLIC_ADD_USER, NEXT_PUBLIC_UPDATE_USER } = useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    // const { InFoUser } = useGetInfoUser()
    const { messageApi } = useContextAdmin()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const [idDepartment, setIdDepartment] = useState<string>(
        `${typeForm === "UPDATE_MODAL" ? rowData?.department?._id : ""}`
    )
    const [active, setActive] = useState<boolean>(
        typeForm === "UPDATE_MODAL" ? !!rowData?.active : true
    )
    console.log("data", rowData)
    const onFinish = (data: any) => {
        // auth
        // birthDay
        // department
        // email
        // firstName
        // lastName
        // phoneNumber
        // username

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
            birthday: dayjs(data.birthDay).toISOString(),
            color: "#fff"
        }
        if (typeForm === "ADD_MODAL") {
            addUserFC(bodyUserRequest)
        }
        if (typeForm === "UPDATE_MODAL") {
            bodyUserRequest.id = rowData?._id
            updateUserFC(bodyUserRequest)
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
    console.log(rowData?.authenProvider?.name)
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
                        }
                    ]}
                >
                    <Input />
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
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Ngày sinh"
                    name="birthDay"
                    rules={[
                        {
                            type: "object" as const,
                            required: true,
                            message: "vui lòng nhập ngày sinh!"
                        }
                    ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format={["DD/MM/YYYY"]}
                    />
                </Form.Item>
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
                    label="Chi nhánh"
                    name="department"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn chi nhánh"
                        }
                    ]}
                >
                    <SelectForm
                        enabledFecthData={typeForm === "UPDATE_MODAL"}
                        type="getDepartment"
                        onChange={HandlerOnchangeDepartment}
                    />
                </Form.Item>
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
                        />
                    </Form.Item>
                )}
                {idDepartment && (
                    <Form.Item
                        style={{ marginBottom: "25px" }}
                        label="Nhóm chức vụ"
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
