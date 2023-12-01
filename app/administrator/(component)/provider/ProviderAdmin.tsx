"use client"
import React, { useState } from "react"
import ContentAdmin, {
    typeContextAdmin
} from "@/app/administrator/(component)/content/contentAdmin"
import { message } from "antd"
type typeProvider = {
    children: React.ReactNode
}

const ProviderBa: React.FC<typeProvider> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage()

    const CustomMesApi = (type: "success" | "error", mess: string) => {
        messageApi[type](mess)
    }
    const data: typeContextAdmin = {
        messageApi: CustomMesApi
    }
    return (
        <ContentAdmin.Provider value={data}>
            {contextHolder}
            {children}
        </ContentAdmin.Provider>
    )
}
export default ProviderBa
