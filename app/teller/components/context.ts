"use client"
import { createContext } from "react"
export interface typeContextMywork {
    setListLeft: React.Dispatch<React.SetStateAction<any[]>>
    listLeft: any[]
    setListRight: React.Dispatch<React.SetStateAction<any[]>>
    listRight: any[]
    setChangeListFilter: React.Dispatch<React.SetStateAction<boolean>>
    ChangeListFilter:boolean
}
const contextMywork = createContext<typeContextMywork>({
    setListLeft: () => {},
    setListRight: () => {},
    setChangeListFilter:()=>{},
    ChangeListFilter:false,
    listLeft: [],
    listRight: [],
    
})
export { contextMywork }
