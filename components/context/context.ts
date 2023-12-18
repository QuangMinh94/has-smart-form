"use client"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Dispatch, SetStateAction, createContext } from "react"
import { Users } from "@/app/(types)/Users"
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
    selectedTree: string
    setSelectedTree: Dispatch<SetStateAction<string>>
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
    setIsDisabled: () => {},
    selectedTree: "",
    setSelectedTree: () => {}
})

export interface typeContextTranfer {
    setListLeft: React.Dispatch<React.SetStateAction<any[]>>
    listLeft: any[]
    setListRight: React.Dispatch<React.SetStateAction<any[]>>
    listRight: any[]
    setChangeListFilter: React.Dispatch<React.SetStateAction<boolean>>
    ChangeListFilter: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
}
const contextTranfer = createContext<typeContextTranfer>({
    setListLeft: () => {},
    setListRight: () => {},
    setChangeListFilter: () => {},
    ChangeListFilter: false,
    listLeft: [],
    listRight: [],
    setLoading: () => {},
    loading: false
})

export interface typeContextCustomeTheme {
    setPrimaryColor: React.Dispatch<string>
    primaryColor: string
    setLogo: React.Dispatch<string>
    logo: string
}
const contextCustomeTheme = createContext<typeContextCustomeTheme>({
    setPrimaryColor: () => {},
    primaryColor: "",
    setLogo: () => {},
    logo: ""
})

export interface typeContextProfile {
    User: Users
    setUser: React.Dispatch<React.SetStateAction<Users>>
}
const contextProfile = createContext<typeContextProfile>({
    User: { defaultGroup: {} },
    setUser: () => {}
})

export { ContextTemplate, contextTranfer, contextCustomeTheme, contextProfile }
