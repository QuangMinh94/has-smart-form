import { dataGlobal } from './../../app/teller/(components)/context';
"use client"
import { useContext } from "react"
import {
    contextMyworkDetail,
    typeContextMyworkDetail,
    typeContextMywork,
    contextMywork
} from "../../app/teller/(components)/context"
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
        choosenBlock:provider.choosenBlock
    }
}
function useContextMyWork(): typeContextMywork {
    const provider = useContext(contextMywork)
    return {
        setListIdRemove: provider.setListIdRemove,
        listIdRmove: provider.listIdRmove
    }
}
export { useContextMyWorkDetail, useContextMyWork }
