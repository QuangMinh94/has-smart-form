"use client"
import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { typeContextMywork, contextMywork } from "../context/context"
import React, { useState } from "react"

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
