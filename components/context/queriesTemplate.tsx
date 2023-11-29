"use client"
import { PropsWithChildren, useState } from "react"
import QueriesContext, {
    QueriesContextType,
    createDate
} from "./queriesContext"

const QueriesTemplate = ({ children }: PropsWithChildren) => {
    const [citizenId, setCitizenId] = useState<string>("")
    const [appointmentCode, setAppointmentCode] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [channel, setChannel] = useState<string[]>([])
    const [createDate, setCreateDate] = useState<createDate | undefined>(
        undefined
    )
    const [status, setStatus] = useState<string>("")
    const [executor, setExecutor] = useState<string[]>([])
    const [eProduct, setEProduct] = useState<string[]>([])
    const [officeBranch, setOfficeBranch] = useState<string[]>([])

    const data: QueriesContextType = {
        setCitizenId,
        citizenId,
        setAppointmentCode,
        appointmentCode,
        setName,
        name,
        setChannel,
        channel,
        setCreateDate,
        createDate,
        setStatus,
        status,
        setExecutor,
        executor,
        setEProduct,
        eProduct,
        setOfficeBranch,
        officeBranch
    }
    return (
        <QueriesContext.Provider value={data}>
            {children}
        </QueriesContext.Provider>
    )
}
export default QueriesTemplate
