"use client"
import { Dispatch, SetStateAction, createContext } from "react"

export interface searchParam {
    setParams: Dispatch<SetStateAction<string>>
    params: string
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
}

export interface pathParams {
    documentName: string
    setDocumentName: Dispatch<SetStateAction<string>>
    pathName: string
    setPathName: Dispatch<SetStateAction<string>>
}

const SearchParamContext = createContext<searchParam>({
    setParams: () => {},
    params: "",
    searchValue: "",
    setSearchValue: () => {}
})

const PathParamsContext = createContext<pathParams>({
    documentName: "",
    setDocumentName: () => {},
    pathName: "",
    setPathName: () => {}
})

export { PathParamsContext, SearchParamContext }
