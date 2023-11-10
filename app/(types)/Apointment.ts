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
