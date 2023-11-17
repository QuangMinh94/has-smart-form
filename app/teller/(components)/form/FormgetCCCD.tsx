"use client"
import React, { memo, useCallback, useState } from "react"
import { useEnvContext } from "next-runtime-env"
import { Button, Form, Input } from "antd"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"

import { User } from "@/app/(types)/infoUser"
import { SeacrhCustomInFo } from "@/app/(service)/appointments"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    showModalFormOder: () => void
    handleCancel: () => void
}
const FormGetCCCD: React.FC<Props> = ({ showModalFormOder, handleCancel }) => {
    const { NEXT_PUBLIC_SEARCH_CUSTOMER_INFO } = useEnvContext()
    const [form] = Form.useForm()
    const [lodingBtn, setLoadingBtn] = useState<boolean>(false)
    const { setDataGlobal } = useContextMyWorkDetail()
    const { token, session } = useCustomCookies()
    const OnFinish = (values: any) => {
        const CCCD = values?.CCCD

        SeacrhCustomInFor(CCCD)
    }
    const SeacrhCustomInFor = async (CCCD: string) => {
        setLoadingBtn(true)
        // try {
        const res = await SeacrhCustomInFo({
            url: NEXT_PUBLIC_SEARCH_CUSTOMER_INFO!,
            bodyRequest: { citizenId: CCCD },
            session,
            token
        })
        setLoadingBtn(false)
        if (res.status === 200) {
            const User: User = res.data[0]
            setDataGlobal((data) => ({
                ...data,
                inFoUser: { ...User, citizenId: CCCD }
            }))
            showModalFormOder()
            handleCancel()
        }
        // }
        // catch (err: any) {
        //     setLoadingBtn(false)
        // }
    }
    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 7 }}
            style={{ maxWidth: 600 }}
            initialValues={{ username: "hoang" }}
            onFinish={OnFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                style={{ marginTop: "25px" }}
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
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{ offset: 10, span: 16 }}
                style={{ marginTop: "50px" }}
            >
                <Button loading={lodingBtn} type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    )
}

export default memo(FormGetCCCD)
