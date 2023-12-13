"use client"
import React, { memo, useState } from "react"

import { ColorPicker, Space, Button } from "antd"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import {
    useContextThemeConfig,
    useContextAdmin,
    useContextAdminUser
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { updateOrganization } from "@/app/(service)/organizations"
import { themeGlobal } from "@/app/(types)/Organization"
import { useEnvContext } from "next-runtime-env"

const SettingTheme = () => {
    const { InFoUser } = useGetInfoUser()
    const { token, session } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const { NEXT_PUBLIC_UPDATE_ORGANIZATIONS } = useEnvContext()
    const { setPrimaryColor, primaryColor, logo } = useContextThemeConfig()
    const [color, setColor] = useState<string>(primaryColor)
    const [loadingSave, setLoadingSave] = useState<boolean>(false)
    const HandlerChange = (value: any, hex: string) => {
        setColor(hex)
    }

    const HandlerSave = async () => {
        const themeGlobal: themeGlobal = {
            theme: {
                token: {
                    colorPrimary: color
                }
            },
            logo: logo
        }
        setLoadingSave(true)
        try {
            const res = await updateOrganization({
                url: NEXT_PUBLIC_UPDATE_ORGANIZATIONS!,
                bodyRequest: {
                    id: InFoUser?.organization?._id ?? "",
                    active: true,
                    themeGlobal
                },
                session,
                token
            })
            setPrimaryColor(color)
            messageApi("success", "lưu thành công")
        } catch (err) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingSave(false)
    }
    return (
        <Space>
            <span>Chọn màu sắc: </span>
            <ColorPicker
                value={primaryColor}
                panelRender={(panel) => (
                    <div className="custom-panel">
                        {panel}
                        <div className="flex">
                            <div className="flex-1">
                                <Button
                                    onClick={() => {
                                        setPrimaryColor(color)
                                    }}
                                >
                                    Dùng thử
                                </Button>
                            </div>
                            <Button
                                loading={loadingSave}
                                type="primary"
                                onClick={HandlerSave}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                )}
                presets={[
                    {
                        label: "Recommended",
                        colors: [
                            "#F5222D",
                            "#FA8C16",
                            "#FADB14",
                            "#8BBB11",
                            "#52C41A",
                            "#13A8A8",
                            "#1677FF",
                            "#2F54EB",
                            "#722ED1",
                            "#EB2F96",
                            "#F5222D4D",
                            "#FA8C164D",
                            "#FADB144D",
                            "#8BBB114D",
                            "#52C41A4D",
                            "#13A8A84D",
                            "#1677FF4D",
                            "#2F54EB4D",
                            "#722ED14D",
                            "#EB2F964D"
                        ]
                    }
                ]}
                onChange={HandlerChange}
            />
        </Space>
    )
}

export default memo(SettingTheme)
