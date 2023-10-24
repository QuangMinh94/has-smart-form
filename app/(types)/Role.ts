import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import type { Organization } from './Organization'
export interface Role {
  _id?: string
  Level?: number
  Name?: string
  __v?: number
  Stt?: number
  Active?: boolean
  Permission?: CheckboxValueType[]
  Organization?: Organization
  Description?: string
}
export interface BodyRoleRequest {
  Name?: string,
  Active?: boolean
  Organization?: string
  Id?: string
  Permission?: CheckboxValueType[]
  Description?:string
}

