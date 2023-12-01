"use client"
import React, { useState } from "react"
import ContentAdmin, {
    typeContextUser,
    DataGlobal
} from "@/app/administrator/(component)/content/contentUser"

type typeProvider = {
    children: React.ReactNode
}

const ProviderUser: React.FC<typeProvider> = ({ children }) => {
    const [dataGlobal, setDataGlobal] = useState<DataGlobal>({
        Users: [],
        DataUploadUsers: []
    })
    const data: typeContextUser = {
        setDataGlobal,
        dataGlobal
    }
    return (
        <ContentAdmin.Provider value={data}>{children}</ContentAdmin.Provider>
    )
}
export default ProviderUser
