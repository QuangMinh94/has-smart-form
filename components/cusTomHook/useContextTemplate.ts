"use client"
import { useContext } from "react"
import { ContextTemplate, typeContextTemplate } from "../context/context"
export function useContextTemplate(): typeContextTemplate {
    const provider = useContext(ContextTemplate)
    return {
        setListLeft: provider.setListLeft,
        setListRight: provider.setListRight,
        listLeft: provider.listLeft,
        listRight: provider.listRight,
        setChangeListFilter: provider.setChangeListFilter,
        ChangeListFilter: provider.ChangeListFilter,
        choosenBlock: provider.choosenBlock,
        setChoosenBlock: provider.setChoosenBlock
    }
}
