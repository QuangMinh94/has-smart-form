export interface RequestApoinMent {
    id: string
    userRole: string
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
