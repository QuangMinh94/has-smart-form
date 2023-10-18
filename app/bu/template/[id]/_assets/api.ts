import { v4 } from "uuid"

export type TaskType = {
    id: string
    content: string
}

export type ColumnType = {
    id: string
    title: string
    tasks: TaskType[]
}

export type TaskBoardType = {
    columns: ColumnType[]
}

export const api: TaskBoardType = {
    columns: [
        {
            id: v4(),
            title: "Danh sách block",
            tasks: [
                { content: "item1", id: v4() },
                { content: "item2", id: v4() },
                { content: "item3", id: v4() }
            ]
        },
        {
            id: v4(),
            title: "Block được chọn",
            tasks: [
                { content: "item1", id: v4() },
                { content: "item2", id: v4() },
                { content: "item3", id: v4() }
            ]
        }
    ]
}
