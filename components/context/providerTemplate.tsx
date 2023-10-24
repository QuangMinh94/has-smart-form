"use client"
import { PropsWithChildren, useState } from "react"
import { ContextTemplate, changeBlock, typeContextTemplate } from "./context"

const ProviderTemplate = ({ children }: PropsWithChildren) => {
    const [listLeft, setListLeft] = useState<any[]>([])
    const [listRight, setListRight] = useState<any[]>([])
    const [ChangeListFilter, setChangeListFilter] = useState<boolean>(false)
    const [choosenBlock, setChoosenBlock] = useState<changeBlock>({
        choosenBlock: [],
        changeBlock: 0
    })
    const data: typeContextTemplate = {
        setListLeft,
        setListRight,
        setChangeListFilter,
        listLeft,
        listRight,
        ChangeListFilter,
        choosenBlock,
        setChoosenBlock
    }
    return (
        <ContextTemplate.Provider value={data}>
            {children}
        </ContextTemplate.Provider>
    )
}
export default ProviderTemplate
