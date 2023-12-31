"use client"
import { addAppointMent, seacrhAppointMent } from "@/app/(service)/appointments"
import { RequestAddApoinMent } from "@/app/(types)/Apointment"
import { myWork } from "@/app/(types)/teller/mywork"
import SelectEproduct from "@/app/users/teller/(components)/customSelect/SelectForm"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import routers from "@/router/cusTomRouter"
import { Button, Form, Input, InputNumber, message } from "antd"
import dayjs from "dayjs"
import { useEnvContext } from "next-runtime-env"
import { useRouter } from "next/navigation"
import React, { memo, useCallback, useState, useTransition } from "react"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = { handleCancelFormOder: () => void }
const FormOder: React.FC<Props> = ({ handleCancelFormOder }) => {
    const router = useRouter()
    const { NEXT_PUBLIC_ADD_APPOINT_MENTS, NEXT_PUBLIC_APPOINT_MENTS } =
        useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    const { InFoUser } = useGetInfoUser()
    const { dataGlobal, setDataGlobal } = useContextMyWorkDetail()
    const [messageApi, contextHolder] = message.useMessage()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const Info = dataGlobal.inFoUser
    const [loadingTransition, Transition] = useTransition()
    const HandlerOnchangeEproduct = useCallback((value: string) => {
        form.setFieldsValue({ eProduct: value })
    }, [])
    const onFinish = ({
        eProduct,
        CCCD,
        name,
        phoneNumber,
        email
    }: {
        eProduct: string
        CCCD: string
        name: string
        phoneNumber: string
        email: string
    }) => {
        const TimeCurent = dayjs().toISOString()
        addAppointMentFC({
            checkOtp: false,
            citizenId: CCCD,
            name,
            phoneNumber,
            email,
            eProduct,
            appointmentTime: TimeCurent,
            officeBranch: InFoUser.department?._id ?? "",
            channel: "COUNTER"
        })
    }

    const addAppointMentFC = async (body: RequestAddApoinMent) => {
        setLoadingBtn(true)
        try {
            const res = await addAppointMent({
                url: NEXT_PUBLIC_ADD_APPOINT_MENTS!,
                bodyRequest: body,
                session,
                token
            })
            if (res.status === 200) {
                const UserCustom: any = InFoUser?.defaultGroup?.role
                const idRole = UserCustom?.[0]?._id
                const resSeacrh = await seacrhAppointMent({
                    url: NEXT_PUBLIC_APPOINT_MENTS!,
                    bodyRequest: {
                        userRole: idRole,
                        appointmentCode: res?.data?.appointmentCode ?? ""
                    },
                    session,
                    token
                })
                const myWorks: myWork[] = resSeacrh.data

                setDataGlobal((data) => {
                    return {
                        ...data,
                        dataMywork: [...data.dataMywork, myWorks[0]]
                    }
                })
                Transition(() => {
                    setDataGlobal((data) => ({
                        ...data,
                        idEProduct: myWorks[0]?.eProduct?._id ?? "",
                        nameEproduct: myWorks[0]?.eProduct?.name ?? ""
                    }))
                    router.push(
                        `${routers("teller").detailMywork.path({
                            id: myWorks[0]?._id ?? ""
                        })}?CCCD=${myWorks[0]?.citizenId}&Name=${
                            myWorks[0].name
                        }&code=${myWorks[0].appointmentCode}`
                    )
                })
                // message.success("thêm thành công")
                // handleCancelFormOder()
            }
        } catch (e) {
            messageApi.error("có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    CCCD: Info?.citizenId ?? "",
                    name: Info?.fullName ?? "",
                    phoneNumber: Info?.mobilePhoneNumber ?? "",
                    email: Info?.emailAddress ?? "",
                    address: InFoUser?.department?.name ?? ""
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Dịch vụ đăng ký"
                    name="eProduct"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn dịch vụ!"
                        }
                    ]}
                >
                    <SelectEproduct
                        onChange={HandlerOnchangeEproduct}
                        type="getEProduct"
                    />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Điểm giao dịch"
                    name="address"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="CCCD"
                    name="CCCD"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập CCCD!"
                        }
                    ]}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Họ và tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập Họ và tên!"
                        }
                    ]}
                >
                    <Input />
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
                    wrapperCol={{ offset: 10, span: 16 }}
                    style={{ marginBottom: "25px", marginTop: "25px" }}
                >
                    <Button
                        loading={loadingBtn || loadingTransition}
                        type="primary"
                        htmlType="submit"
                    >
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default memo(FormOder)
