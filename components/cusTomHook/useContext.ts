"use client"
import { useContext } from "react"
import {
    contextMywork,
    typeContextMywork
} from "../../app/teller/components/context"
function useContextMyWork(): typeContextMywork {
    const provider = useContext(contextMywork)
    return {
        setListLeft: provider.setListLeft,
        setListRight: provider.setListRight,
        listLeft: provider.listLeft,
        listRight: provider.listRight,
        setChangeListFilter: provider.setChangeListFilter,
        ChangeListFilter: provider.ChangeListFilter
    }
}
export { useContextMyWork }
