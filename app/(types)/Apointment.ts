import { Users } from "./Users"
import { channel } from "./channel"
import { eProduct } from "./eProduct"
import { status } from "./status"

export interface RequestApoinMent {
    id?: string
    userRole?: string
    queryCode?: string
}
export interface RequestSeacrhApoinMent {
    citizenId?: string
    userRole: string
    appointmentCode?: string
}
export interface RequestSeacrhCustomInfo {
    citizenId: string
    emailAddress?: string
    mobilePhoneNumber?: string
}
export interface RequestAddApoinMent {
    otp?: string
    name: string
    email: string
    officeBranch: string
    appointmentTime: string
    channel: "COUNTER"
    eProduct: string
    citizenId: string
    phoneNumber: string
    checkOtp: boolean
}

export interface Appointment {
    _id: string
    name?: string //
    citizenId: string //
    address: string
    createDate: Date | undefined
    email: string //
    phoneNumber: string //
    cif: string
    active: boolean
    appointmentCode: string
    appointmentTime: Date | undefined //
    officeBranch: string | any //
    channel: string | channel
    eProduct: string | eProduct //
    executor: string | Users
    status: string | status
    queryCode: string
}
