import React, { createContext } from "react"
import type { DataNode } from "antd/es/tree"

export type TreeFilter = {
    expandedKeys: React.Key[]
    searchValue: string
    autoExpandParent: boolean
}
export interface RecordType {
    key: string
    title: string
    description?: string
    chosen: boolean
}
export interface typeContextTransfer {
    setTargetKeys: React.Dispatch<React.SetStateAction<string[]>>
    setData: React.Dispatch<React.SetStateAction<RecordType[]>>
    targetKeys: string[]
    Data: RecordType[]
}

const contextTransfer = createContext<typeContextTransfer>({
    setTargetKeys: () => {},
    setData: () => {},
    targetKeys: [],
    Data: []
})

export { contextTransfer }
