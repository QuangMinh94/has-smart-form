export interface taskEform {
    data: any
    fromTemplate: string
    documentId: string
}
export interface RequestEformTaks {
    eformTasks: taskEform[]
    appointment: string
    button: "SAVE" | "SUBMIT" | "CANCEL"
}
