"use client"
import { dataGlobal } from "./../../../teller/(components)/context"

import React, { createContext } from "react"
import { Users } from "@/app/(types)/Users"
export type DataGlobal = {
    Users: Users[]
    DataUploadUsers: Users[]
}
export interface typeContextUser {
    setDataGlobal: React.Dispatch<React.SetStateAction<DataGlobal>>
    dataGlobal: DataGlobal
}
const contextAdmin = createContext<typeContextUser>({
    setDataGlobal: () => {},
    dataGlobal: {
        Users: [],
        DataUploadUsers: []
    }
})

export default contextAdmin
