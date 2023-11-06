"use client"
import React from "react"
import { theme } from "antd"
import routers from "@/router/cusTomRouter"
import { myWork } from "@/app/(types)/teller/mywork"
type Props = {
    content: string
    data: myWork
}
import { useRouter } from "next/navigation"
const ButtonApprove: React.FC<Props> = ({ content, data }) => {
    const router = useRouter()
    const {
        token: { colorPrimary }
    } = theme.useToken()

    return (
        <div
            onClick={() => {
                router.push(
                    routers("ksvTeller").appRove.path({ id: data?._id ?? "" }) +
                        `?code=${data?.eProduct?._id}`
                )
            }}
            className="font-semibold cursor-pointer hover:brightness-150"
            style={{ color: colorPrimary }}
        >
            {content}
        </div>
    )
}
export default ButtonApprove
