import { authenInfo } from "./formFiled/FormConnectManager/authenInfo"
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

export interface AuthenInfo {
    body?: authenInfo[]
    type?: string
    method?: string
    urlToken?: string
    fieldToken?: string
    fieldsHeader?: string[]
}
