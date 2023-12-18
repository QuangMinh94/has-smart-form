"use client"
import React, { useState, memo, useMemo, useCallback } from "react"

import { UserOutlined, UploadOutlined } from "@ant-design/icons"
import { message, Upload, Popover, Button, Avatar, theme, Image } from "antd"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { useEnvContext } from "next-runtime-env"

import {
    useContextProfile,
    useContextAdmin
} from "@/components/cusTomHook/useContext"
import { updateUser } from "@/app/(service)/User"
import { CustomeBase64, CustomGetBase64 } from "@/util/customerBase64"
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    console.log("file size", file.size)
    const isBigger70kb = file.size > 70000
    if (!isJpgOrPng) {
        message.error("vui lòng chọn định dạng JPG/PNG !")
        return false
    }

    if (isBigger70kb) {
        message.error("vui lòng chọn ảnh dưới 70KB")
        return false
    }
    return true
}
const AvtarCustome: React.FC<{ url: string; onClick?: () => void }> = memo(
    ({ url, onClick }) => {
        const {
            token: { colorPrimary }
        } = theme.useToken()

        const isCssClick = onClick ? "cursor-pointer hover:opacity-50" : ""

        return (
            <div
                onClick={onClick}
                className={`h-[100px] w-[100px] shadow-2xl  rounded-full ${isCssClick}`}
            >
                {url ? (
                    <Image
                        preview={false}
                        width={"100%"}
                        height={"100%"}
                        style={{
                            borderRadius: "50%"
                        }}
                        src={`${url}`}
                        fallback="data:image/png;base64,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"
                        alt="Icon"
                    />
                ) : (
                    <Avatar
                        size={100}
                        style={{ backgroundColor: colorPrimary }}
                        icon={<UserOutlined />}
                    />
                )}
            </div>
        )
    }
)
const ContentUpload: React.FC<{ HidePopover: () => void }> = memo(
    ({ HidePopover }) => {
        const { NEXT_PUBLIC_UPDATE_USER } = useEnvContext()
        const { token, session } = useCustomCookies()
        const { messageApi } = useContextAdmin()
        const { User, setUser } = useContextProfile()
        const [loadingBtn, setLoadingBtn] = useState(false)
        const [urlBase64, setUrlBase64] = useState<string>(
            CustomGetBase64({
                type: User?.image?.contentType ?? "",
                data: User?.image?.data ?? ""
            })
        )
        const [type, setType] = useState<string>("")

        const handleChange: UploadProps["onChange"] = (
            info: UploadChangeParam<UploadFile>
        ) => {
            info.file.status = "done"

            if (info.file.status === "done") {
                getBase64(info.file.originFileObj as RcFile, (url) => {
                    setUrlBase64(url)
                    setType(info?.file?.type ?? "")
                })
            }
        }

        const HandlerSave = async () => {
            setLoadingBtn(true)
            try {
                const res = await updateUser({
                    url: NEXT_PUBLIC_UPDATE_USER!,
                    bodyRequest: {
                        id: User._id ?? "",
                        image: {
                            contentType: type,
                            data: CustomeBase64(urlBase64)
                        }
                    },
                    session,
                    token
                })
                setUser((user) => {
                    return {
                        ...user,
                        image: {
                            contentType: type,
                            data: CustomeBase64(urlBase64)
                        }
                    }
                })
                HidePopover()
                messageApi("success", "lưu thành công")
            } catch (err) {
                messageApi("error", "có lỗi vui lòng thử lại sau")
            }
            setLoadingBtn(false)
        }
        const style = { marginBottom: "1.5vh" }
        return (
            <>
                <div className="grid justify-items-center">
                    <div className="mb-[1vh]">
                        <AvtarCustome url={urlBase64} />
                    </div>
                    <Upload
                        action={""}
                        customRequest={() => {}}
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />} style={style}>
                            Tải ảnh lên
                        </Button>
                    </Upload>

                    <Button
                        style={style}
                        onClick={() => {
                            setUrlBase64("")
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            style={{ marginRight: "3px" }}
                        />
                        Xóa ảnh hồ sơ
                    </Button>
                </div>

                <div className="flex justify-end">
                    <Button
                        danger
                        type="primary"
                        style={{ marginRight: "0.6vw" }}
                        onClick={HidePopover}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={HandlerSave}
                        loading={loadingBtn}
                        type="primary"
                    >
                        Lưu
                    </Button>
                </div>
            </>
        )
    }
)

AvtarCustome.displayName = "AvtarCustome"
ContentUpload.displayName = "ContentUpload"

const UploadImg: React.FC = () => {
    const { User } = useContextProfile()
    const [open, setOpen] = useState<boolean>(false)
    const avatar = useMemo(
        () =>
            CustomGetBase64({
                type: User?.image?.contentType ?? "",
                data: User?.image?.data ?? ""
            }),
        [User.image?.data]
    )

    const Hide = useCallback(() => {
        setOpen(false)
    }, [])
    const show = useCallback(() => {
        setOpen(true)
    }, [])
    return (
        <>
            <Popover
                destroyTooltipOnHide={true}
                placement="right"
                title={"Ảnh hồ sơ"}
                open={open}
                onOpenChange={(open) => setOpen(open)}
                content={<ContentUpload HidePopover={Hide} />}
                trigger={"click"}
            >
                <AvtarCustome onClick={show} url={avatar} />
            </Popover>
        </>
    )
}

export default memo(UploadImg)
