import { Dispatch, Key, SetStateAction, createContext } from "react"

export interface formManagementTypeContext {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
    setOpenDetails: Dispatch<SetStateAction<boolean>>
    openDetails: boolean
    setSelectedKey: Dispatch<SetStateAction<Key[]>>
    selectedKey: Key[]
}

const ContextFormManagement = createContext<formManagementTypeContext>({
    setOpen: () => {},
    open: false,
    setOpenDetails: () => {},
    openDetails: false,
    setSelectedKey: () => {},
    selectedKey: []
})

export { ContextFormManagement }
