"use client"
import React, { createContext } from "react"
import { myWork } from "@/app/(types)/teller/mywork"
import { User } from "@/app/(types)/infoUser"
export type choosenBlock = {
    name: string
    location: string
    ozrRepository: string
    idTemplate: string
}
export type changeBlock = {
    choosenBlock: choosenBlock[]
    changeBlock: number
}
export type dataGlobal = {
    idEProduct: string
    nameEproduct: string
    dataMywork: myWork[]
    myworkDetail: myWork
    inFoUser: User
}
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
    dataGlobal: {
        idEProduct: "",
        nameEproduct: "",
        dataMywork: [],
        myworkDetail: { docusignDocumentId: "" },
        inFoUser: {
            _id: "",
            createDate: "",
            citizenId: "",
            dateOfBirth: "",
            fullName: "",
            mobilePhoneNumber: "",
            emailAddress: ""
        }
    },
    setDataGlobal: () => {},
    setLoading: () => {},
    loading: false
})

export { contextMyworkDetail }
