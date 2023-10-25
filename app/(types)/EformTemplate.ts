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
    updatedDate?: Date
    updateBy?: string
    validFrom?: Date
    validTo?: Date
    status?: string
    description?: string
}
