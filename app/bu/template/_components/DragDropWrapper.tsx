"use client"

import { ReactNode } from "react"
import { ColumnType } from "../[id]/_assets"
import { DragDropProvider } from "../[id]/_components"

const DragDropWrapper = ({
    children,
    data
}: {
    children: ReactNode
    data: ColumnType[]
}) => {
    return <DragDropProvider data={data}>{children}</DragDropProvider>
}

export default DragDropWrapper
