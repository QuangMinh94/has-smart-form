export interface formTemplate {
    _id?: string
    name?: string
    code?: string
    createdDate?: string
    creator?: string
    block?: {
        name: string
        location: string
        ozrRepository: string
        _id: string
    }[]

    updatedDate?: string
    validFrom?: string
    validTo: string
    status?: string
    description?: string
    __v?: number
}

export interface eProduct {
    image?: {
        data: string
        contentType: string
    }
    createdDate?: string
    formTemplate?: formTemplate[]
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
    _id?: string
    parent?: string
}
