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
    parent?: { _id: string; name: string }
    type?: string
    code?: string
    address?: string
    stage?: string
    distric?: string
    children?: Department[]
    village?: string
}
export interface bodyDepartmentRequest {
    id?: string
    name: string
    parent?: string
    active: boolean
    type: string
    code: string
    address: string
    stage: string
    distric: string
    village: string
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
