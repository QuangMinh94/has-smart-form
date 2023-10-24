import { Group } from './Group'
import { Role } from './Role'
export interface Filter {
    Name?: string,
    View?: string,
    User?: string,
    Active?: boolean,
    Condition?: Group[],
    _Id?: string,
    Assignee?: string
}