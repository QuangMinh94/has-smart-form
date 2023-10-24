import { CustomerResponse } from '../database/Customer'
import { Group } from '../database/Group'
import { Role } from '../database/Role'
import { Users } from '../database/Users'
import { Package } from './Package'
export interface typeFormProps {
    handleCancel: () => void
    type: string

}

export interface typeFormPropsUserADM extends typeFormProps {
    dataRow?: Users
    isUploadDataNoApi?: boolean
}
export interface typeFormPropsCustommerADM extends typeFormProps {
    dataRow?: CustomerResponse
}
export interface typeFormPropsRolesADM extends typeFormProps {
    dataRow?: Role
}
export interface typeFormPropsGroupADM extends typeFormProps {
    dataRow?: Group
    isTreeview?: boolean
}

export interface typeFormPropsPackageADM extends typeFormProps {
    dataRow?: Package
}
