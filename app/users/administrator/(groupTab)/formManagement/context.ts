import { Dispatch, SetStateAction, createContext } from "react"

export interface formManagementTypeContext {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}

const ContextFormManagement = createContext<formManagementTypeContext>({
    setOpen: () => {},
    open: false
})

export { ContextFormManagement }
