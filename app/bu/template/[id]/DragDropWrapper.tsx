"use client"

import { PropsWithChildren } from "react"
import { api } from "./_assets"
import { DragDropProvider } from "./_components"

const DragDropWrapper = ({ children }: PropsWithChildren) => {
    return <DragDropProvider data={api.columns}>{children}</DragDropProvider>
}

export default DragDropWrapper
