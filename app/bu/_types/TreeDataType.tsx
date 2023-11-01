import { ReactNode } from "react"

export type TreeDataType = {
    value: string
    title: ReactNode
    children?: TreeDataType[]
}
