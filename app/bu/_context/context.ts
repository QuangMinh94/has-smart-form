"use client"
import { Dispatch, SetStateAction, createContext } from "react"

export interface searchParam {
    setParams: Dispatch<SetStateAction<string>>
    params: string
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
}
const SearchParamContext = createContext<searchParam>({
    setParams: () => {},
    params: "",
    searchValue: "",
    setSearchValue: () => {}
})
export { SearchParamContext }
