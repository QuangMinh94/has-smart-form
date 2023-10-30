import type { CheckboxValueType } from "antd/es/checkbox/Group"
import { Department } from "./Department"
import { Organization } from "./Organization"
export interface Parent {
    Active?: boolean
    CreatedDate?: string
    Creator?: string
    Name?: string
    Organization?: string
    Role?: string[]
    _id?: string
}
export interface Group {
    _id?: string
    name?: string
    __v?: number
    active?: boolean
    description?: string
    parent?: Parent
    role?: CheckboxValueType[] | string[]
    organization?: Organization
    department?: Department
    createdDate?: string
    creator?: string
    children?: Group[]
    position?: string
    user?: string[]
}

export interface bodyGroupRequest {
    Id?: string
    Name?: string
    Role?: CheckboxValueType[]
    Active?: boolean
    Parent?: string
    Organization?: string
    Department?: string
    Position?: string
}
