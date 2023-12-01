import { dataGlobal } from "./../../../teller/(components)/context"
;("use client")

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
