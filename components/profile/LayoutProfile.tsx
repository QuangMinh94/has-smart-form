"use client"
import { theme } from "antd"
import React from "react"
import UploadAvatar from "./UploadAvatar"
import { Button } from "antd"
import InfoUser from "./InfoUser"
import { useRouter } from "next/navigation"
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const LayOutProfile = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()
    const router = useRouter()
    return (
        <div className="h-screen flex">
            <div
                style={{
                    padding: "0px 20px 20px 20px",
                    width: "100%",
                    background: colorBgContainer,
                    overflowY: "scroll"
                }}
            >
                <div>
                    <div className="grid justify-items-end mt-[1vw]">
                        <Button
                            type="primary"
                            onClick={() => {
                                router.back()
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faLongArrowAltLeft}
                                style={{ marginRight: "4px" }}
                            />
                            Quay lại
                        </Button>
                    </div>

                    <div>
                        <UploadAvatar />
                    </div>
                    <div>
                        <InfoUser />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayOutProfile
