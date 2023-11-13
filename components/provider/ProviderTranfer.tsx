"use client"

import React, { createContext, useState } from "react"
import { contextTranfer, typeContextTranfer } from "../context/context"

type Props = {
    children: React.ReactNode
}
const ProviderTranfer: React.FC<Props> = ({ children }) => {
    const [listLeft, setListLeft] = useState<any[]>([])
    const [listRight, setListRight] = useState<any[]>([])
    const [ChangeListFilter, setChangeListFilter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const data: typeContextTranfer = {
        setListLeft,
        setListRight,
        setChangeListFilter,
        setLoading,
        listLeft,
        listRight,
        ChangeListFilter,
        loading
    }
    return (
        <contextTranfer.Provider value={data}>
            {children}
        </contextTranfer.Provider>
    )
}
export default ProviderTranfer
