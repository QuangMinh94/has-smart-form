export interface EformTemplate {
    _id?: string
    name?: string
    approver?: string
    type?: string
    code?: string
    active?: string
    createdDate?: Date
    creator?: string
    fromReference?: string
    block?: [
        {
            name?: string
            location?: string
            ozrRepository?: string
        }
    ]
    updatedDate?: string | Date
    updateBy?: string
    validFrom?: string | Date
    validTo?: string | Date
    status?: Status
    description?: string
}

export interface Status {
    disabled: boolean
    _id: string
    code: string
    name: string
    type: string
    active: boolean
    description: string
}
