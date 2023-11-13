export interface taskEform {
    data: any
    formTemplate: string
    documentId: string
}
export interface RequestEformTaks {
    data: any
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
    data: {
        Input: any
    }
}
