"use client"
import { PropsWithChildren, useState } from "react"
import { SearchParamContext, searchParam } from "./context"

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
export default SearchParamProvider
