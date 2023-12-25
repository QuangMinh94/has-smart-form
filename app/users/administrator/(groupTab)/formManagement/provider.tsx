"use client"

import { PropsWithChildren, useState } from "react"
import { ContextFormManagement, formManagementTypeContext } from "./context"

export const FormManagementProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(false)

    const data: formManagementTypeContext = {
        setOpen,
        open
    }
    return (
        <ContextFormManagement.Provider value={data}>
            {children}
        </ContextFormManagement.Provider>
    )
}
