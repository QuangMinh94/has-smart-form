export interface taskEform {
    data: any
    formTemplate: string
    documentId: string
}
export interface RequestEformTaks {
    eformTasks: taskEform[]
    appointment: string
    button: "SAVE" | "SUBMIT" | "CANCEL"
}
