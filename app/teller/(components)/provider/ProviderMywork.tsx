"use client"
import React, { useState } from "react"
import { contextMywork, typeContextMywork } from "../context"

type typeProvider = {
    children: React.ReactNode
}

const ProviderMyWork: React.FC<typeProvider> = ({ children }) => {
    const [listIdRmove, setListIdRemove] = useState<React.Key[]>([])

    const data: typeContextMywork = {
        setListIdRemove,
        listIdRmove
    }
    return (
        <contextMywork.Provider value={data}>{children}</contextMywork.Provider>
    )
}
export default ProviderMyWork
