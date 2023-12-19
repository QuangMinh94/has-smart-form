"use client"

import React, { createContext } from "react"

export interface typeContextAdmin {
    messageApi: (type: "success" | "error", mess: string) => void
}
const contextAdmin = createContext<typeContextAdmin>({
    messageApi: () => {}
})

export default contextAdmin
