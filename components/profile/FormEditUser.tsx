"use client"
import React, { memo, useState } from "react"

import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { Button, Form, Input } from "antd"
import { useEnvContext } from "next-runtime-env"
import { Users } from "@/app/(types)/Users"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import { updateUser, changePassWordUser } from "@/app/(service)/User"
import { BodyUserRequest, BodyRequestChangePass } from "@/app/(types)/Users"
import { useContextProfile } from "@/components/cusTomHook/useContext"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}

export type typeUpdate = "email" | "phone" | "name" | "password"

type Props = {
    cancel: () => void
    typeUpdate: typeUpdate
}

const FormEditUser: React.FC<Props> = ({ cancel, typeUpdate }) => {
    const { NEXT_PUBLIC_UPDATE_USER, NEXT_PUBLIC_CHANGE_PASSWORD_USER } =
        useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const { User, setUser } = useContextProfile()
    const onFinish = (data: any) => {
        const body: {
            email: BodyUserRequest
            phone: BodyUserRequest
            name: BodyUserRequest
            password: BodyRequestChangePass
        } = {
            email: { id: User._id, mail: data.email },
            phone: { id: User._id, phone: data.phone },
            name: {
                id: User._id,
                firstName: data.firstName,
                lastName: data.lastName
            },
            password: { oldPassword: data.passOld, newPassword: data.passNew }
        }
        if (typeUpdate === "password") {
            changpassword(body[`${typeUpdate}`])
        } else {
            updateUserFC(body[`${typeUpdate}`])
        }
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
                setUser((user) => {
                    delete body.id
                    const custombody: Users = body as Users

                    return { ...user, ...custombody }
                })
                cancel()
                messageApi("success", "Cập nhật thành công")
            }
        } catch (e: any) {
            console.log("err", e)
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }
    const changpassword = async (body: BodyRequestChangePass) => {
        setLoadingBtn(true)
        try {
            const res = await changePassWordUser({
                url: NEXT_PUBLIC_CHANGE_PASSWORD_USER!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                cancel()
                messageApi("success", "Đổi mật khẩu thành công")
            }
        } catch (e: any) {
            const { code, message } = e?.response?.data
            if (code === 500) {
                if (message === "Wrong Password") {
                    messageApi("error", "mật khẩu không đúng vui lòng thử lại")
                    form.setFieldsValue({ passOld: "" })
                }
            } else {
                messageApi("error", "có lỗi vui lòng thử lại sau")
            }
        }
        setLoadingBtn(false)
    }
    const globaldata: any = {
        email: { email: User.mail },
        phone: { phone: User.phone },
        name: { firstName: User.firstName, lastName: User.lastName }
    }

    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                // style={{ maxWidth: 600 }}
                initialValues={{
                    ...globaldata[`${typeUpdate}`]
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div
                    className={`${
                        typeUpdate === "password"
                            ? ""
                            : "flex items-center h-[5vh]"
                    } `}
                >
                    {typeUpdate === "email" && (
                        <Form.Item
                            name={`${typeUpdate}`}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập email",
                                    type: "email"
                                }
                            ]}
                        >
                            <Input size="small" />
                        </Form.Item>
                    )}
                    {typeUpdate === "phone" && (
                        <Form.Item
                            name={`${typeUpdate}`}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập số điện thoại"
                                }
                            ]}
                        >
                            <Input size="small" type="Number" />
                        </Form.Item>
                    )}
                    {typeUpdate === "name" && (
                        <div className="flex items-center">
                            <div className="mr-[1vw]">
                                <Form.Item
                                    label="Tên"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Vui lòng nhập tên"
                                        }
                                    ]}
                                >
                                    <Input size="small" />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Họ đệm"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Vui lòng nhập họ đệm"
                                        }
                                    ]}
                                >
                                    <Input size="small" />
                                </Form.Item>
                            </div>
                        </div>
                    )}
                    {typeUpdate === "password" && (
                        <>
                            <Form.Item
                                style={{ marginBottom: "20px" }}
                                label="Mật khẩu cũ"
                                name="passOld"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Vui lòng nhập mật khẩu cũ"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: "20px" }}
                                label="Mật khẩu mới"
                                name="passNew"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            const isValidChecktype =
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                                                    value
                                                )

                                            const isValidchekLength =
                                                `${value ?? ""}`.replace(
                                                    /\s/g,
                                                    ""
                                                ).length >= 8

                                            if (
                                                isValidChecktype &&
                                                isValidchekLength
                                            ) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                <>
                                                    {!isValidchekLength && (
                                                        <div>
                                                            * Mật khẩu phải có
                                                            ít nhất 8 ký tự
                                                        </div>
                                                    )}
                                                    {!isValidChecktype && (
                                                        <div>
                                                            * Mật khẩu phải bao
                                                            gồm chữ thường, chữ
                                                            hoa, số
                                                        </div>
                                                    )}
                                                </>
                                            )
                                        }
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: "20px" }}
                                label="Xác nhận lại mật khẩu"
                                name="passConfirm"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Vui lòng nhập lại mật khẩu"
                                    },
                                    {
                                        validator(_, value) {
                                            const passNew =
                                                form.getFieldValue("passNew")

                                            if (value === passNew) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                "Xác nhận mật khẩu phải giống Mật khẩu mới"
                                            )
                                        }
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    )}
                    <div className="my-[25px] flex justify-end ml-[0.5vw] ">
                        <Button
                            type="primary"
                            onClick={cancel}
                            danger
                            size={
                                typeUpdate === "password" ? undefined : "small"
                            }
                        >
                            Hủy
                        </Button>
                        <div className="ml-[10px]">
                            <Button
                                loading={loadingBtn}
                                type="primary"
                                htmlType="submit"
                                size={
                                    typeUpdate === "password"
                                        ? undefined
                                        : "small"
                                }
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(FormEditUser)
