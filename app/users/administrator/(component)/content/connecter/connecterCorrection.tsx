"use client"
import { corrections } from "@/app/(types)/Connecter"
import React, { createContext } from "react"
export type DataGlobal = {
    Correction: corrections[]
}
export interface typeContextCorrection {
    setDataGlobal: React.Dispatch<React.SetStateAction<DataGlobal>>
    dataGlobal: DataGlobal
}
const contextAdmin = createContext<typeContextCorrection>({
    setDataGlobal: () => {},
    dataGlobal: {
        Correction: []
    }
})

export default contextAdmin
