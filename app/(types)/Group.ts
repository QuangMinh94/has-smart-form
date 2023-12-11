import type { CheckboxValueType } from "antd/es/checkbox/Group"
import { Department } from "./Department"
import { Organization } from "./Organization"
export interface Parent {
    name?: string
    _id?: string
}
export interface Group {
    _id?: string
    name?: string
    __v?: number
    active?: boolean
    description?: string
    parent?: Parent
    role?: CheckboxValueType[] | string[] | Role[]
    organization?: Organization
    department?: Department
    createdDate?: string
    creator?: string
    children?: Group[]
    position?: string
    user?: string[]
}

export interface Role {
    _id?: string
    __v: number
    active: boolean
    createdDate: Date
    name: string
    organization: string
    permission: string[]
    description: string
}

export interface bodyGroupRequest {
    id?: string
    name?: string
    role?: CheckboxValueType[]
    active?: boolean
    parent?: string
    organization?: string
    department?: string
    position?: string
}
