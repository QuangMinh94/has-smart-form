"use client"
import React, { useState } from "react"
import { contextMywork, typeContextMywork } from "../context"

type typeProvider = {
    children: React.ReactNode
}

const ProviderMyWork: React.FC<typeProvider> = ({ children }) => {
    const [listLeft, setListLeft] = useState<any[]>([])
    const [listRight, setListRight] = useState<any[]>([])
    const [ChangeListFilter, setChangeListFilter] = useState<boolean>(false)
    const data: typeContextMywork = {
        setListLeft,
        setListRight,
        setChangeListFilter,
        listLeft,
        listRight,
        ChangeListFilter
    }
    return (
        <contextMywork.Provider value={data}>{children}</contextMywork.Provider>
    )
}
export default ProviderMyWork
