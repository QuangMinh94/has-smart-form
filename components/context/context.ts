"use client"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Dispatch, SetStateAction, createContext } from "react"

export type changeBlock = {
    choosenBlock: { name?: string; location?: string; ozrRepository?: string }[]
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
    formData: EformTemplate[]
    setFormData: Dispatch<SetStateAction<EformTemplate[]>>
    isInsert: boolean
    setIsInsert: Dispatch<SetStateAction<boolean>>
    isDisabled: boolean
    setIsDisabled: Dispatch<SetStateAction<boolean>>
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
    setSubmitType: () => {},
    formData: [],
    setFormData: () => {},
    isInsert: true,
    setIsInsert: () => {},
    isDisabled: false,
    setIsDisabled: () => {}
})
export { ContextTemplate }
