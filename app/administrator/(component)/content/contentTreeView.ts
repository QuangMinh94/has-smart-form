import React, { createContext } from "react"
import type { DataNode } from "antd/es/tree"

export type TreeFilter = {
    expandedKeys: React.Key[]
    searchValue: string
    autoExpandParent: boolean
}
export interface typeContextTree {
    setDataGlobal: React.Dispatch<React.SetStateAction<dataGlobal>>
    setTreeFilter: React.Dispatch<React.SetStateAction<TreeFilter>>
    treeFilter: TreeFilter
    dataGlobal: dataGlobal
}
export type dataGlobal = {
    DataNode: DataNode[]
}
const contextTreeView = createContext<typeContextTree>({
    setDataGlobal: () => {},
    dataGlobal: { DataNode: [] },
    setTreeFilter: () => {},
    treeFilter: {
        expandedKeys: [],
        searchValue: "",
        autoExpandParent: true
    }
})

export { contextTreeView }
