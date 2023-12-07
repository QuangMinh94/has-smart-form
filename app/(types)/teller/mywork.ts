import { channel } from "../channel"
import { eProduct, formTemplate } from "../eProduct"
import { status } from "../status"
import { Users } from "../Users"
interface eProductforMywork {
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
    children?: eProduct[]
}
export interface eFormTask {
    _id: string
    createdDate: string
    creator: string
    data: { Input: any }
    formTemplate: formTemplate[]
    documentId: string
    docusignDocumentId: string
    ecmDocumentId: string
    __v?: number
}
export interface displayRule {
    status: string
    executor: boolean
    visibleView: boolean
    visibleGroupButton: boolean
    visibleTemplate: boolean
    visibleOzr: boolean
    VisibleInfo: boolean
}
export interface myWork {
    key?: string
    _id?: string
    citizenId?: string
    name?: string
    eProduct?: eProductforMywork
    createDate?: string
    status?: status
    implementer?: string
    appointmentCode?: string
    appointmentTime?: string
    eformTask?: eFormTask[]
    channel?: channel
    docusignDocumentId: string
    displayRule?: displayRule
    executor?: Users
}
