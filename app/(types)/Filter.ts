import { Group } from "./Group"
export interface Filter {
    Name?: string
    View?: string
    User?: string
    Active?: boolean
    Condition?: Group[]
    _Id?: string
    Assignee?: string
}
