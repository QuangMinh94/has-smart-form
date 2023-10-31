"use client"
import React, { createContext } from "react"
export type changeBlock = {
    choosenBlock: { name?: string; location?: string; ozrRepository?: string }[]
    changeBlock: number
}
export type dataGlobal = { repository: string; appointment: string }
export interface typeContextMyworkDetail {
    setListLeft: React.Dispatch<React.SetStateAction<any[]>>
    listLeft: any[]
    setListRight: React.Dispatch<React.SetStateAction<any[]>>
    listRight: any[]
    setChangeListFilter: React.Dispatch<React.SetStateAction<boolean>>
    ChangeListFilter: boolean

    choosenBlock: changeBlock
    setChoosenBlock: React.Dispatch<React.SetStateAction<changeBlock>>
    dataGlobal: dataGlobal
    setDataGlobal: React.Dispatch<React.SetStateAction<dataGlobal>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
}
const contextMyworkDetail = createContext<typeContextMyworkDetail>({
    setListLeft: () => {},
    setListRight: () => {},
    setChangeListFilter: () => {},
    ChangeListFilter: false,
    listLeft: [],
    listRight: [],
    choosenBlock: { changeBlock: 0, choosenBlock: [] },
    setChoosenBlock: () => {},
    dataGlobal: { repository: "", appointment: "" },
    setDataGlobal: () => {},
    setLoading:()=>{},
    loading: false

})
export interface typeContextMywork {
    setListIdRemove: React.Dispatch<React.Key[]>
    listIdRmove: React.Key[]
}
const contextMywork = createContext<typeContextMywork>({
    setListIdRemove: () => {},
    listIdRmove: []
})
export { contextMyworkDetail, contextMywork }
