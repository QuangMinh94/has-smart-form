"use client"

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState
} from "react"

export type changeBlock = {
    choosenBlock: { name: string; location: string; ozrRepository: string }[]
    changeBlock: number
}
export interface contextBlock {
    choosenBlock: changeBlock
    setChoosenBlock: Dispatch<SetStateAction<changeBlock>>
}

const defaulState = {
    choosenBlock: { choosenBlock: [] },
    changeBlock: 0
} as unknown as contextBlock

export const contextBLockInput = createContext(defaulState)

type subtaskProvideProps = { children: ReactNode }

export default function TemplatesProvider({ children }: subtaskProvideProps) {
    const [choosenBlock, setChoosenBlock] = useState<changeBlock>({
        choosenBlock: [],
        changeBlock: 0
    })
    return (
        <contextBLockInput.Provider value={{ choosenBlock, setChoosenBlock }}>
            {children}
        </contextBLockInput.Provider>
    )
}
