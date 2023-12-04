import { Department } from "./Department"
import { Group, Role } from "./Group"
import { Organization } from "./Organization"

export interface Token {
    token?: string
    session?: string
}

export interface Users extends Token {
    key?: number | string
    _id?: string
    enterReportToMe?: boolean
    userName?: string
    password?: string
    name?: string
    role?: Role
    department?: Department
    color?: string
    defaultGroup: Group
    firstName?: string
    lastName?: string
    group?: Group[]
    message?: string
    code?: number
    __v?: number
    stt?: number
    active?: boolean
    root?: string
    image?: IImage
    mail?: string
    permission?: any[]
    organization?: string | Organization
    authenProvider?: any
    phone?: string
    birthday?: string
}

export interface BodyUserRequest {
    id?: string
    userName?: string
    name?: string
    firstName?: string
    lastName?: string
    role?: string
    group?: string[]
    department?: string
    color?: string
    active?: boolean
    image?: {
        data?: string
        contentType?: string
    }
    root?: string
    mail?: string
    authenProvider?: string
    phone?: string
    defaultGroup?: string
    password?: string
    birthday?: Date | string
}

export interface IImage {
    Data?: string
    ContentType?: string
}
export interface UsersUploadFile {
    FirstName: string
    LastName: string
    Group: { _id: string; Name: string }
    Department: { _id: string; Name: string }
    UserName: string
    Mail: string
    key: number
    Active?: boolean
    PhoneNumber?: number
    AuthenProvider?: { _id: string; Name: string }
}
export interface TemlateExcel {
    FirstName: string
    LastName: string
    Group: string
    Department: string
    UserName: string
    Email: string
    PhoneNumber: string
    AuthenProvider: string

    __rowNum__?: string
}
export interface BodyUserRequestFileExcel {
    firstName: string
    lastName: string
    group: string
    department: string
    userName: string
    email: string
    phoneNumber: string
    authenProvider: string
    active: boolean
}
export interface ResponseAddUser {
    FirstName: string
    LastName: string
    Group: string
    Department: string
    UserName: string
    Email: string
    PhoneNumber: string
    AuthenProvider: string
    Active: boolean
    Uploaded: string
}

export interface bodyRequestAddUserToGroup {
    groupId?: string
    listUser: string[]
}

export interface bodyRequestSeacrhUser {
    active: boolean
    name: string
}
export interface InforUser {
    _id?: string
    fullName: string
    gender?: boolean
    dateOfBirth?: string
    createDate?: string
    citizenId: string
    mobilePhoneNumber: string
    emailAddress: string
    __v?: number
}
