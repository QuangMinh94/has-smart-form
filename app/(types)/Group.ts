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
    Name?: string
    __v?: number
    Active?: boolean
    Description?: string
    Parent?: Parent
    Role?: CheckboxValueType[]
    Organization?: Organization
    Department?: Department
    CreatedDate?: string
    Creator?: string
    Children?: Group[]
    Position?: string
    User?: string[]
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
