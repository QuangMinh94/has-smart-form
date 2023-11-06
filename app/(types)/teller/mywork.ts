import { eProduct } from "../eProduct"
import { status } from "../status"
interface eProductforMywork {
    image?: {
        data: string
        contentType: string
    }
    createdDate?: string
    formTemplate?: string[]
    _id?: string
    active?: boolean
    code?: string
    name: string
    creator?: string
    description?: string
    type?: string
    children?: eProduct[]
}
export interface myWork {
    key: string
    _id?: string
    citizenId?: string
    name?: string
    eProduct?: eProductforMywork
    createDate?: string
    status?: status
    implementer?: string
    appointmentCode: string
    appointmentTime: string
}
