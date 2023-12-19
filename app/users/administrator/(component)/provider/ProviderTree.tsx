"use client"
import React, { useState } from "react"

import {
    typeContextTree,
    TreeFilter,
    dataGlobal,
    contextTreeView
} from "@/app/users/administrator/(component)/content/contentTreeView"

type typeProvider = {
    children: React.ReactNode
}

const ProviderTree: React.FC<typeProvider> = ({ children }) => {
    const [dataGlobal, setDataGlobal] = useState<dataGlobal>({
        DataNode: []
    })
    const [treeFilter, setTreeFilter] = useState<TreeFilter>({
        expandedKeys: [],
        searchValue: "",
        autoExpandParent: true
    })

    const data: typeContextTree = {
        setDataGlobal,
        dataGlobal,
        treeFilter,
        setTreeFilter
    }
    return (
        <contextTreeView.Provider value={data}>
            {children}
        </contextTreeView.Provider>
    )
}
export default ProviderTree
