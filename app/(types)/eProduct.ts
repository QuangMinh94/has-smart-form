export interface eProduct {
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
}
export interface requestBodyEproduct {
    type?: string
    id?: string
    parent?: string
}
