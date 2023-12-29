export type Parent = {
    _id: string
    name: string
}

export type Child = {
    _id: string
    name: string
    active: boolean
    createdDate: string
    parent: Parent
    __v: number
    children: Child[]
}

export type FolderTree = {
    createdDate: string
    _id: string
    name: string
    active: boolean
    children: Child[]
}

export type File = {
    _id: string
    name: string
    folder: string
    physicalFilePath: string
    physicalFileName: string
    __v: number
    creator: any
    createdDate: Date
}

export type Folder = {
    _id: string
    name: string
    active: boolean
    createdDate: Date
    parent: string
    __v: number
    creator: any
}

export type FolderContent = {
    file: File[]
    folder?: Folder[]
}
