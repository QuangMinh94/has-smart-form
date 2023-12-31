"use client"
import { connnector, corrections } from "@/app/(types)/Connecter"
import { CustomEproduct } from "@/app/users/administrator/(component)/TreeCustome/CustomTreeAttachBusiness"
import ContentAttachBu, {
    DataGlobal,
    typeContextAttachBu
} from "@/app/users/administrator/(component)/content/connecter/connecterAttachBu"
import React, { useState } from "react"

type typeProvider = {
    children: React.ReactNode
    Eproduct: CustomEproduct[]
    Connecter: connnector[]
    Correction: corrections[]
}

const ProviderAttachBu: React.FC<typeProvider> = ({
    children,
    Eproduct,
    Connecter,
    Correction
}) => {
    const [dataGlobal, setDataGlobal] = useState<DataGlobal>({
        Eproduct: Eproduct,
        Connecter: Connecter,
        Correction: Correction,
        MappingTable: { sourceParams: [], targetParams: [], dataType: [] }
    })
    const [tab, setTab] = useState<string>("ADMIN_ATTACH_BUSINESS")
    const [EproductActive, setIdEproductActive] = useState<CustomEproduct>({})
    const [FillterCorrection, setFillterCorrection] = useState<string>("")

    // useEffect(() => {
    //     setDataGlobal({ ...dataGlobal, Eproduct })
    // }, [JSON.stringify(Eproduct)])
    const data: typeContextAttachBu = {
        setDataGlobal,
        dataGlobal,
        tab,
        setTab,
        EproductActive,
        setIdEproductActive,
        setFillterCorrection,
        FillterCorrection
    }
    return (
        <ContentAttachBu.Provider value={data}>
            {children}
        </ContentAttachBu.Provider>
    )
}
export default ProviderAttachBu
