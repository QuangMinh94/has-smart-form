"use client"

import React, { createContext } from "react"
import type { DataNode } from "antd/es/tree"
import { eProduct } from "./../../(types)/eProduct"
export type choosenBlock = {
    name: string
    location: string
    ozrRepository: string
    idTemplate: string
}

export type dataGlobal = {
    choosenBlock: choosenBlock[]
    eProducts: eProduct[]
    DataNode: DataNode[]
    checkedForm: boolean
}
export type TreeFilter = {
    expandedKeys: React.Key[]
    searchValue: string
    autoExpandParent: boolean
}
export interface typeContextBa {
    dataGlobal: dataGlobal
    setDataGlobal: React.Dispatch<React.SetStateAction<dataGlobal>>
    messageApi: (type: "success" | "error", mess: string) => void
    setTreeFilter: React.Dispatch<React.SetStateAction<TreeFilter>>
    treeFilter: TreeFilter
}
const contextBa = createContext<typeContextBa>({
    dataGlobal: {
        choosenBlock: [],
        eProducts: [],
        DataNode: [],
        checkedForm: true
    },
    setDataGlobal: () => {},
    messageApi: () => {},
    setTreeFilter: () => {},
    treeFilter: {
        expandedKeys: [],
        searchValue: "",
        autoExpandParent: true
    }
})

export { contextBa }
