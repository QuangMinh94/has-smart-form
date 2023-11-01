export interface Permission {
    _id?: string
    name?: string
    value?: boolean
    children: any[]
    active?: boolean
    createdDate?: string
    object?: string
}
