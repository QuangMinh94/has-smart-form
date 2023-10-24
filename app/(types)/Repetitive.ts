
export type typeInheritField = "Tag" | "Description" | "Subtask"
type RepetitiveModeandScope = {
    CategoryId: number
    Code: string
    Color: string
    Disabled: boolean
    Level: number
    Name: string
    Type: string
    _id: string
}
export interface RequestRepititive {
    userId: string
    userName: string
    task?: string
    inheritField?: typeInheritField[]
    repetitiveMode?: string
    repetitiveScope?: string
    repetitiveTime?: string
    start?: string
    end?: string
    id?:string
    taskDuration?:number
}
export interface Repetitive {
    _id?: string
    Task?: string
    InheritField?: typeInheritField[]
    RepetitiveMode?: RepetitiveModeandScope
    RepetitiveScope?: RepetitiveModeandScope
    RepetitiveTime?:string
    Start?: string
    End?: string
    __v?: number
    TaskDuration?:number
}