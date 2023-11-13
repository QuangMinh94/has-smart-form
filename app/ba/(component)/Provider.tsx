"use client"
import React, { useState } from "react"
import { contextBa, typeContextBa, dataGlobal } from "./content"

type typeProvider = {
    children: React.ReactNode
}

const ProviderMyWorkDetail: React.FC<typeProvider> = ({ children }) => {
    const [dataGlobal, setDataGlobal] = useState<dataGlobal>({
        choosenBlock: []
    })
    const data: typeContextBa = {
        setDataGlobal,
        dataGlobal
    }
    return <contextBa.Provider value={data}>{children}</contextBa.Provider>
}
export default ProviderMyWorkDetail
