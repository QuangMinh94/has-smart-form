export interface taskEform {
    data: any
    formTemplate: string
    documentId: string
}
export interface RequestEformTaks {
    data: { Input: any }
    formTemplate: string[]
    appointmentId: string
    documentId: string
    button: "SAVE" | "SUBMIT" | "CANCEL"
}

export interface RequestVeRiFyEformTaks {
    id: string
    rejectReason?: string
    button: "SUBMIT" | "REJECT"
    citizenId: string
    data: any
}
export interface RequestSeacrhEformTemplate {
    userRole: string
    name?: string
    onlyApprove: boolean
}
export interface RequestSeacrhEformTemplate {
    userRole: string
    name?: string
    onlyApprove: boolean
}
export interface RequestFilterTemplate {
    name?: string
    creator?: string
    approver?: string
    status?: string
    createdDate?: { from?: string; to?: string }
    eProduct?: string
}
