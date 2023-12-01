export interface AuthenProvider {
    _id?: string
    name?: string
    type?: string
    url?: string
    active?: boolean
    organization?: string
    createdDate?: Date
    creator?: string
}
