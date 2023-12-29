"use client"
import { connnector, corrections } from "@/app/(types)/Connecter"
import { CustomEproduct } from "@/app/users/administrator/(component)/TreeCustome/CustomTreeAttachBusiness"
import React, { createContext } from "react"
export type DataGlobal = {
    Eproduct: CustomEproduct[]
    Connecter: connnector[]
    Correction: corrections[]
}
export interface typeContextAttachBu {
    setDataGlobal: React.Dispatch<React.SetStateAction<DataGlobal>>
    dataGlobal: DataGlobal
    tab: string
    setTab: React.Dispatch<React.SetStateAction<string>>
    EproductActive: CustomEproduct
    setIdEproductActive: React.Dispatch<React.SetStateAction<CustomEproduct>>
}
const contextAdmin = createContext<typeContextAttachBu>({
    setDataGlobal: () => {},
    dataGlobal: {
        Eproduct: [],
        Connecter: [],
        Correction: []
    },
    tab: "ADMIN_ATTACH_BUSINESS",
    setTab: () => {},
    EproductActive: {},
    setIdEproductActive: () => {}
})

export default contextAdmin
