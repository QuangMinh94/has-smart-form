"use client"
import {
    authenInfo,
    authenInfoFieldHeader,
    authenInfoTextForm
} from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { parametter } from "@/app/(types)/formFiled/FormConnectManager/parametter"
import React, { createContext } from "react"
export type DataForm = {
    parametter: parametter[]
    authenInfo: {
        header: authenInfo[]
        body: authenInfo[]
        fieldsHeader: authenInfoFieldHeader[]
        textInfo: authenInfoTextForm
    }
}
export interface typeContextManager {
    setDataForm: React.Dispatch<React.SetStateAction<DataForm>>
    DataForm: DataForm
}
const contextManager = createContext<typeContextManager>({
    setDataForm: () => {},
    DataForm: {
        parametter: [],
        authenInfo: { header: [], body: [], fieldsHeader: [], textInfo: {} }
    }
})

export default contextManager
