import { ReactNode } from "react"
export interface block {
    name: string
    location: string
    ozrRepository: string
    _id: string
}
export interface formTemplate {
    _id?: string
    name?: string
    code?: string
    createdDate?: string
    creator?: string
    block?: block[]
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
    children?: eProduct[]
}
export interface requestBodyEproduct {
    type?: string
    _id?: string
    parent?: string
}
export interface requestBodyEproductTree {
    name?: string
    code?: string
    active?: boolean
    id?: string
    type?: string
}
export interface OptionTree {
    value: string
    title: ReactNode
    children: OptionTree[]
    formTemplate: formTemplate[]
}

export interface requestBodyAddEproduct {
    name: string
    description: string
    active: boolean
    code: string
    type: "P" | "B"
    parent: string
    formTemplate: string[]
    image: {
        Data: string
        ContentType: string
    }
}
