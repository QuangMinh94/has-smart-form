"use client"
import { PropsWithChildren, useState } from "react"
import {
    PathParamsContext,
    SearchParamContext,
    pathParams,
    searchParam
} from "./context"

const SearchParamProvider = ({ children }: PropsWithChildren) => {
    const [params, setParams] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")

    const data: searchParam = {
        params,
        setParams,
        searchValue,
        setSearchValue
    }
    return (
        <SearchParamContext.Provider value={data}>
            {children}
        </SearchParamContext.Provider>
    )
}

const PathParamsProvider = ({ children }: PropsWithChildren) => {
    const [documentName, setDocumentName] = useState<string>("")
    const [pathName, setPathName] = useState<string>("")
    const data: pathParams = {
        documentName,
        setDocumentName,
        setPathName,
        pathName
    }

    return (
        <PathParamsContext.Provider value={data}>
            {children}
        </PathParamsContext.Provider>
    )
}

export { PathParamsProvider, SearchParamProvider }
