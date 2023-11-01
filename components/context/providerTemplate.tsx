"use client"
import { EformTemplate } from "@/app/(types)/EformTemplate"
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
    const [submitType, setSubmitType] = useState<string>("")
    const [formData, setFormData] = useState<EformTemplate[]>([])
    const [isInsert, setIsInsert] = useState<boolean>(true)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [selectedTree, setSelectedTree] = useState<string>("")

    const data: typeContextTemplate = {
        setListLeft,
        setListRight,
        setChangeListFilter,
        listLeft,
        listRight,
        ChangeListFilter,
        choosenBlock,
        setChoosenBlock,
        submitType,
        setSubmitType,
        formData,
        setFormData,
        isInsert,
        setIsInsert,
        isDisabled,
        setIsDisabled,
        selectedTree,
        setSelectedTree
    }
    return (
        <ContextTemplate.Provider value={data}>
            {children}
        </ContextTemplate.Provider>
    )
}
export default ProviderTemplate
