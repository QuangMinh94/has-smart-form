"use client"
import ContentAdmin, {
    DataGlobal,
    typeContextUser
} from "@/app/users/administrator/(component)/content/contentUser"
import React, { useState } from "react"

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
