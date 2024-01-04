import { authenInfo } from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { AuthenInfo } from "./AuthenProvider"
export interface connnector {
    createdDate?: string
    _id: string
    authenInfo?: AuthenInfo
    description?: string
    url?: string
    params?: string[]
    connectorType?: string
    dataTest?: string
    name?: string
    connectorGroup?: string
    key?: number
    updatedDate?: string
    active?: boolean
    nameconnectorGroup?: string
    method?: string
    checked?: boolean
}
export interface integration {
    mappingTable: Partial<mappingTable>
    _id?: string
    connection: connnector
    updatedDate: string
    createdDate: string
    string: string
}
export interface Requestauthen {
    body?: authenInfo[]
    headers?: authenInfo[]
    type?: string
    method?: string
    urlToken?: string
    fieldToken?: string
    fieldsHeader?: string[]
}
export interface RequestTestConnection {
    authenInfo?: Requestauthen
    method?: string
    url?: string
    connectorType?: string
    dataTest?: any
}
export interface RequestAddOrUpdateConnection {
    id?: string
    authenInfo?: Requestauthen
    method?: string
    url?: string
    connectorType?: string
    dataTest?: any
    description?: string
    params?: string[]
    name?: string
    connectorGroup?: string
    active?: boolean
}
export interface corrections {
    key?: number
    parametterConntion?: string
    attachBusiness?: string
    type?: { id: string; name: string }
    description?: string
}
interface mappingTable {
    sourceParams: string[]
    targetParams: string[]
    dataType: string[]
}
export interface RequestAddIntergration {
    connection: string
    eProduct: string
    mappingTable: mappingTable
}

export interface RequestSearchIntergration {
    connection?: string
    eProduct?: string
}
