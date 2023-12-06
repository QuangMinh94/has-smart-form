import { Users } from "./Users"
export interface Parent {
    Active: boolean
    Manager: Users
    Name: string
    Organization: string
    Parent: string
    __v: number
    _id: string
}

export interface Department {
    _id?: string
    active?: boolean
    name?: string
    organization?: string
    parent?: string
    type?: string
    code?: string
    address?: string
    stage?: string
    distric?: string
    Children?: Department[]
}
export interface bodyDepartmentRequest {
    Id: string
    Name?: string
    Active?: boolean
    Description?: string
    Parent?: Parent
    Organization?: string
}
export interface DepartmentTreeView {
    Active?: boolean
    Children: DepartmentTreeView[]
    Manager?: Users
    Name?: string
    Organization?: string
    __v?: number
    _id?: string
}
