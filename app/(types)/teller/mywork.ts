import { eProduct } from "../eProduct"
import { status } from "../status"

export interface myWork {
    key: string
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
