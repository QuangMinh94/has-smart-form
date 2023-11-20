"use client"
import { useContext } from "react"
import {
    contextMyworkDetail,
    typeContextMyworkDetail
} from "../../app/teller/(components)/context"

import { typeContextTranfer, contextTranfer } from "../context/context"
import { typeContextBa, contextBa } from "@/app/ba/(component)/content"
function useContextMyWorkDetail(): typeContextMyworkDetail {
    const provider = useContext(contextMyworkDetail)
    return {
        setListLeft: provider.setListLeft,
        setListRight: provider.setListRight,
        listLeft: provider.listLeft,
        listRight: provider.listRight,
        setChangeListFilter: provider.setChangeListFilter,
        ChangeListFilter: provider.ChangeListFilter,
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal,
        setChoosenBlock: provider.setChoosenBlock,
        choosenBlock: provider.choosenBlock,
        setLoading: provider.setLoading,
        loading: provider.loading
    }
}
function useContextTranfer(): typeContextTranfer {
    const provider = useContext(contextTranfer)
    return {
        setListLeft: provider.setListLeft,
        setListRight: provider.setListRight,
        listLeft: provider.listLeft,
        listRight: provider.listRight,
        setChangeListFilter: provider.setChangeListFilter,
        ChangeListFilter: provider.ChangeListFilter,
        setLoading: provider.setLoading,
        loading: provider.loading
    }
}
function useContextBa(): typeContextBa {
    const provider = useContext(contextBa)
    return {
        setDataGlobal: provider.setDataGlobal,
        dataGlobal: provider.dataGlobal,
        messageApi: provider.messageApi,
        setTreeFilter: provider.setTreeFilter,
        treeFilter: provider.treeFilter
    }
}
export { useContextMyWorkDetail, useContextTranfer, useContextBa }
