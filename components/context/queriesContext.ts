"use client"
import { Dispatch, SetStateAction, createContext } from "react"

export type createDate = { from: Date; to: Date }

export type QueriesContextType = {
    setCitizenId: Dispatch<SetStateAction<string>>
    citizenId: string
    setAppointmentCode: Dispatch<SetStateAction<string>>
    appointmentCode: string
    setName: Dispatch<SetStateAction<string>>
    name: string
    setChannel: Dispatch<SetStateAction<string[]>>
    channel: string[]
    setCreateDate: Dispatch<SetStateAction<createDate | undefined>>
    createDate: createDate | undefined
    setStatus: Dispatch<SetStateAction<string[]>>
    status: string[]
    setExecutor: Dispatch<SetStateAction<string[]>>
    executor: string[]
    setEProduct: Dispatch<SetStateAction<string[]>>
    eProduct: string[]
    setOfficeBranch: Dispatch<SetStateAction<string[]>>
    officeBranch: string[]
}

const DefaultData = {
    setCitizenId: () => {},
    citizenId: "",
    setAppointmentCode: () => {},
    appointmentCode: "",
    setName: () => {},
    name: "",
    setChannel: () => {},
    channel: [],
    setCreateDate: () => {},
    createDate: undefined,
    setStatus: () => {},
    status: [],
    setExecutor: () => {},
    executor: [],
    setEProduct: () => {},
    eProduct: [],
    setOfficeBranch: () => {},
    officeBranch: []
}

const QueriesContext = createContext<QueriesContextType>(DefaultData)

export default QueriesContext
