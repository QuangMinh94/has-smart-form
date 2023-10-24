import dayjs from 'dayjs'
import { RangeValue } from 'rc-picker/lib/interface'
import { DataOBJ } from '../../DemoBPM/service'
import { FilterInterface } from '../interface/FilterInterface'
import { SelectorValue } from "../interface/SelectorValue"

interface ValueFilter {
    taskName: string
    assignee: SelectorValue[]
    reporter: SelectorValue[]
    project: SelectorValue[] | any
    status: string[]
    priority: string[]
    dueDate: RangeValue<dayjs.Dayjs>
    closeDate: RangeValue<dayjs.Dayjs>
    statusCategory: SelectorValue[] | any
    priorityCategory: SelectorValue[] | any
    report: string
    department: string
}

export interface FilterTemplateRequest {
    id?: string
    name?: string
    view?: string,
    user: string,
    active?: boolean,
    favorite?: string,
    condition?: {
        serviceFilter: FilterInterface,
        valueFilter: ValueFilter
    }

}
export interface Onleave {
    id?: string
    name?: string
    view?: string,
    user: string,
    active?: boolean,
    favorite?: string,
    condition?: {
        serviceFilter?: DataOBJ,
        valueFilter?: ValueFilter
    }
}

export interface FilterTemplateResponse {
    Favorite: undefined
    favorite: any
    _id: string,
    Name: string
    View: string,
    User: string,
    Active: boolean,
    Condition: {
        serviceFilter: FilterInterface,
        valueFilter: ValueFilter
    }
}