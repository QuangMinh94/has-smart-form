"use client"

import { Key, PropsWithChildren, useState } from "react"
import { ContextFormManagement, formManagementTypeContext } from "./context"

export const FormManagementProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(false)
    const [openDetails, setOpenDetails] = useState<boolean>(false)
    const [selectedKey, setSelectedKey] = useState<Key[]>([])

    const data: formManagementTypeContext = {
        setOpen,
        open,
        setOpenDetails,
        openDetails,
        setSelectedKey,
        selectedKey
    }
    return (
        <ContextFormManagement.Provider value={data}>
            {children}
        </ContextFormManagement.Provider>
    )
}
