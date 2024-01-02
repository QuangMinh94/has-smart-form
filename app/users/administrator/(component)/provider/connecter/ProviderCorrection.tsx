"use client"
import { corrections } from "@/app/(types)/Connecter"
import ContentCorrection, {
    DataGlobal,
    typeContextCorrection
} from "@/app/users/administrator/(component)/content/connecter/connecterCorrection"
import React, { useState } from "react"
type typeProvider = {
    children: React.ReactNode
    Correction: corrections[]
}

const ProviderCorrection: React.FC<typeProvider> = ({
    children,
    Correction
}) => {
    const [dataGlobal, setDataGlobal] = useState<DataGlobal>({
        Correction: Correction
    })
    const data: typeContextCorrection = {
        setDataGlobal,
        dataGlobal
    }
    return (
        <ContentCorrection.Provider value={data}>
            {children}
        </ContentCorrection.Provider>
    )
}
export default ProviderCorrection
