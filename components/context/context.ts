"use client"
import { Dispatch, SetStateAction, createContext } from "react"

export type changeBlock = {
    choosenBlock: { name: string; location: string; ozrRepository: string }[]
    changeBlock: number
}
export interface typeContextTemplate {
    setListLeft: Dispatch<SetStateAction<any[]>>
    listLeft: any[]
    setListRight: Dispatch<SetStateAction<any[]>>
    listRight: any[]
    setChangeListFilter: Dispatch<SetStateAction<boolean>>
    ChangeListFilter: boolean
    choosenBlock: changeBlock
    setChoosenBlock: Dispatch<SetStateAction<changeBlock>>
    submitType: string
    setSubmitType: Dispatch<SetStateAction<string>>
}
const ContextTemplate = createContext<typeContextTemplate>({
    setListLeft: () => {},
    setListRight: () => {},
    setChangeListFilter: () => {},
    ChangeListFilter: false,
    listLeft: [],
    listRight: [],
    choosenBlock: { changeBlock: 0, choosenBlock: [] },
    setChoosenBlock: () => {},
    submitType: "",
    setSubmitType: () => {}
})
export { ContextTemplate }
