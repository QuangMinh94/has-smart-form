"use client"
import { message } from "antd"
import React, { useState } from "react"
import {
    TreeFilter,
    contextBa,
    dataGlobal,
    typeContextBa
} from "../../ba/(component)/content"
type typeProvider = {
    children: React.ReactNode
}

const ProviderBa: React.FC<typeProvider> = ({ children }) => {
    const [dataGlobal, setDataGlobal] = useState<dataGlobal>({
        choosenBlock: [],
        eProducts: [],
        DataNode: [],

        checkedForm: true
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
