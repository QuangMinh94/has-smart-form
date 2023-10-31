"use client"
import React, { useState } from "react"
import { contextMyworkDetail, typeContextMyworkDetail } from "../context"

type typeProvider = {
    children: React.ReactNode
}
import { changeBlock } from "../context"
import { dataGlobal } from "../context"
const ProviderMyWorkDetail: React.FC<typeProvider> = ({ children }) => {
    const [listLeft, setListLeft] = useState<any[]>([])
    const [listRight, setListRight] = useState<any[]>([])
    const [ChangeListFilter, setChangeListFilter] = useState<boolean>(false)

    const [choosenBlock, setChoosenBlock] = useState<changeBlock>({
        choosenBlock: [],
        changeBlock: 0
    })
    const [dataGlobal, setDataGlobal] = useState<dataGlobal>({
        repository: "",
        appointment: ""
    })
    const data: typeContextMyworkDetail = {
        setListLeft,
        setListRight,
        setChangeListFilter,
        setDataGlobal,
        setChoosenBlock,
        dataGlobal,
        listLeft,
        listRight,
        ChangeListFilter,
        choosenBlock
    }
    return (
        <contextMyworkDetail.Provider value={data}>
            {children}
        </contextMyworkDetail.Provider>
    )
}
export default ProviderMyWorkDetail
