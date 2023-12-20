"use client"
import React, { useState, memo } from "react"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { message, Upload } from "antd"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import UseGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import { themeGlobal } from "@/app/(types)/Organization"
import { useEnvContext } from "next-runtime-env"
import { updateOrganization } from "@/app/(service)/organizations"
import {
    useContextThemeConfig,
    useContextAdmin
} from "@/components/cusTomHook/useContext"

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
}

const UploadImg: React.FC = () => {
    const { NEXT_PUBLIC_UPDATE_ORGANIZATIONS } = useEnvContext()
    const { token, session } = useCustomCookies()
    const { InFoUser } = UseGetInfoUser()

    const [loading, setLoading] = useState(false)
    const { messageApi } = useContextAdmin()
    const { logo, setLogo, primaryColor } = useContextThemeConfig()
    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true)
            return
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false)
                messageApi("success", "cập nhật thành công")
                setLogo(url)
            })
        }
        if (info.file.status === "error") {
            setLoading(false)
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>
                {loading ? "vui lòng đợi" : "Chọn ảnh"}
            </div>
        </div>
    )

    const customeRequest = async (options: any) => {
        const { onSuccess, onError, file, onProgress, action } = options

        getBase64(file as RcFile, async (url) => {
            const themeGlobal: themeGlobal = {
                theme: {
                    token: {
                        colorPrimary: primaryColor
                    }
                },
                logo: url as string
            }

            try {
                const res = await updateOrganization({
                    url: action!,
                    bodyRequest: {
                        id: InFoUser?.organization?._id ?? "",
                        active: true,
                        themeGlobal
                    },
                    session,
                    token
                })

                onSuccess("Ok")
                console.log("server res: ", res)
            } catch (err) {
                console.log("Eroor: ", err)
                const error = new Error("Some error")
                onError({ err })
            }
        })
    }
    return (
        <>
            <Upload
                action={NEXT_PUBLIC_UPDATE_ORGANIZATIONS!}
                customRequest={customeRequest}
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                maxCount={1}
                style={{ overflow: "hidden" }}
            >
                {logo && !loading ? (
                    <img
                        src={logo}
                        alt="avatar"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%"
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </>
    )
}

export default memo(UploadImg)
