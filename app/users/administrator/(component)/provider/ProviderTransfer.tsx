"use client"
import React, { useState } from "react"

import {
    RecordType,
    contextTransfer,
    typeContextTransfer
} from "@/app/users/administrator/(component)/content/contentTransfer"

type typeProvider = {
    children: React.ReactNode
}

const ProviderTree: React.FC<typeProvider> = ({ children }) => {
    const [targetKeys, setTargetKeys] = useState<string[]>([])
    const [Data, setData] = useState<RecordType[]>([])

    const data: typeContextTransfer = {
        setData,
        setTargetKeys,
        targetKeys,
        Data
    }
    return (
        <contextTransfer.Provider value={data}>
            {children}
        </contextTransfer.Provider>
    )
}
export default ProviderTree
