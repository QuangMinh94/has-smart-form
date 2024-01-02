"use client"
import ContentManager, {
    DataForm,
    typeContextManager
} from "@/app/users/administrator/(component)/content/connecter/connecterManager"

import React, { useState } from "react"

type typeProvider = {
    children: React.ReactNode
}

const ProviderManager: React.FC<typeProvider> = ({ children }) => {
    const [DataForm, setDataForm] = useState<DataForm>({
        parametter: [],
        authenInfo: {
            header: [],
            body: [],
            fieldsHeader: [],
            textInfo: {}
        }
    })
    const data: typeContextManager = {
        setDataForm,
        DataForm
    }
    return (
        <ContentManager.Provider value={data}>
            {children}
        </ContentManager.Provider>
    )
}
export default ProviderManager
