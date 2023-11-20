"use client"
import React, { useState } from "react"
import { contextBa, typeContextBa, dataGlobal, TreeFilter } from "./content"
import { message } from "antd"
type typeProvider = {
    children: React.ReactNode
}

const ProviderBa: React.FC<typeProvider> = ({ children }) => {
    const [dataGlobal, setDataGlobal] = useState<dataGlobal>({
        choosenBlock: [],
        eProducts: [],
        DataNode: []
    })
    const [treeFilter, setTreeFilter] = useState<TreeFilter>({
        expandedKeys: [],
        searchValue: "",
        autoExpandParent: true
    })
    const [messageApi, contextHolder] = message.useMessage()

    const CustomMesApi = (type: "success" | "error", mess: string) => {
        messageApi[type](mess)
    }
    const data: typeContextBa = {
        setDataGlobal,
        dataGlobal,
        messageApi: CustomMesApi,
        treeFilter,
        setTreeFilter
    }
    return (
        <contextBa.Provider value={data}>
            {contextHolder}
            {children}
        </contextBa.Provider>
    )
}
export default ProviderBa
