"use client"
import React, { createContext } from "react"

export type choosenBlock = {
    name: string
    location: string
    ozrRepository: string
    idTemplate: string
}

export type dataGlobal = {
    choosenBlock: choosenBlock[]
}
export interface typeContextBa {
    dataGlobal: dataGlobal
    setDataGlobal: React.Dispatch<React.SetStateAction<dataGlobal>>
}
const contextBa = createContext<typeContextBa>({
    dataGlobal: {
        choosenBlock: []
    },
    setDataGlobal: () => {}
})

export { contextBa }
