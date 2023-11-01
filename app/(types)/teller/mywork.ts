import { eProduct } from "../eProduct"
import { status } from "../status"

export interface myWork {
    key: number
    _id?: string
    citizenId?: string
    name?: string
    eProduct?: eProduct
    createDate?: string
    status?: status
    implementer?: string
    appointmentCode: string
    appointmentTime: string
}
