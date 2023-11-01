export type TreeProduct = {
    image: any
    createdDate: Date
    formTemplate: any[]
    _id: string
    active: true
    code: string
    name: string
    creator: string
    description: string
    type: string
    children: TreeProduct[] | []
    parent?: {
        _id: string
        name: string
    }
}
