export interface EformTemplate {
    key?: string
    _id?: string
    name?: string
    approver?: any
    type?: string
    code?: string
    active?: string
    createdDate?: Date
    creator?: string
    fromReference?: string
    block?: Block[]
    updatedDate?: string | Date
    updateBy?: string
    validFrom?: string | Date
    validTo?: string | Date
    status?: Status
    description?: string
    queryCode?: string
    displayRule?: DisplayRule
}

export interface DisplayRule {
    status?: string
    creator?: boolean
    approver?: boolean
    visibleView: boolean
    visibleGroupButton: boolean
    visibleTemplate: boolean
    visibleOzr: boolean
    visibleInfo: boolean
}

export const DefaultActiveRule: DisplayRule = {
    visibleView: true,
    visibleGroupButton: true,
    visibleTemplate: true,
    visibleOzr: true,
    visibleInfo: true
}

export const DefaultDeactiveRule: DisplayRule = {
    visibleView: false,
    visibleGroupButton: false,
    visibleTemplate: false,
    visibleOzr: false,
    visibleInfo: false
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
export interface Block {
    name?: string
    location?: string
    ozrRepository?: string
    _id?: string
}
