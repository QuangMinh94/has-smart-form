"use client"
import { connnector, corrections, mappingTable } from "@/app/(types)/Connecter"
import { CustomEproduct } from "@/app/users/administrator/(component)/TreeCustome/CustomTreeAttachBusiness"
import React, { createContext } from "react"
export type DataGlobal = {
    Eproduct: CustomEproduct[]
    Connecter: connnector[]
    Correction: corrections[]
    MappingTable: mappingTable
}

export interface typeContextAttachBu {
    setDataGlobal: React.Dispatch<React.SetStateAction<DataGlobal>>
    dataGlobal: DataGlobal
    setFillterCorrection: React.Dispatch<React.SetStateAction<string>>
    FillterCorrection: string
    tab: string
    setTab: React.Dispatch<React.SetStateAction<string>>
    EproductActive: CustomEproduct
    setIdEproductActive: React.Dispatch<React.SetStateAction<CustomEproduct>>
}
const contextAdmin = createContext<typeContextAttachBu>({
    setDataGlobal: () => {},
    setFillterCorrection: () => {},
    dataGlobal: {
        Eproduct: [],
        Connecter: [],
        Correction: [],
        MappingTable: { sourceParams: [], targetParams: [], dataType: [] }
    },
    FillterCorrection: "",
    tab: "ADMIN_ATTACH_BUSINESS",
    setTab: () => {},
    EproductActive: {},
    setIdEproductActive: () => {}
})

export default contextAdmin
