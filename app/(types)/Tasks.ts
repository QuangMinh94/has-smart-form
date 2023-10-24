import { TaskDetailsProps } from '../interface/ComponentsJson'
import { Error } from '../interface/Error'
import { Category } from './Categories'
import { ProjectRepsonse } from './Project'
import { TagName } from './TagName'
import { Users } from './Users'


export type typeRepetitions = string | null
export interface Tasks {
  _id?: string
  TaskName: string
  Description: string
  Priority: string
  PriorityNum?: number
  CreateDate: Date
  StartDate?: Date
  DueDate?: Date
  DoneDate?: Date
  CloseDate?: Date
  CancelDate?: Date
  Creator?: any
  Assignee: Users[]
  Watcher: any[]
  Tag: TagName[]
  Subtask?: any[]
  Attachment: any[]
  SummaryAttachment?: any[]
  Comment: any[]
  Status: string
  Reporter: Users
  Reporters?: Users[]
  GroupPath: string
  __v?: number
  created?: boolean
  Score?: number
  ScoreComment?: string
  ScoreModifiedDate?: Date
  errorMessage?: string
  userId?: string
  userName?: string
  tasks?: any[]
  Project?: ProjectRepsonse
  ParentTask?: any
  SummaryReport?: string
  StatusCategory?: any
  PriorityCategory?: any
  AssigneeRead?: boolean
  ReporterRead?: boolean
  ReasonForClosed?: string
  WatcherRead?: boolean
  Permission?: TaskDetailsProps
  Criteria?: CriteriaOB[]
  WaitingOn?: any[]
  Blocking?: any[]
  Linked?: any[]
  Checked?: boolean
  Repetition?: typeRepetitions
}
export type TypeUploadTask = 'Repetition' | 'DueDate'
export interface CriteriaOB {
  Actual: any
  Currency: any
  Expected: any
  Category: Category,
  Name: string,
  Value: number,
  _v: number,
  _id: string,
  ActualResult?: number,
  Creator: string,
}

export interface CountTaskRequest {
  userId: string
}

export interface CountTaskResponse {
  AssigneeTasks?: number
  ReporterTasks?: number
  WatcherTasks?: number
  Projects?:number
}

export interface ErrorTaskRelationship extends Error {
  type: string
  data?: Tasks[]
}

export interface TaskDuplicate {
  _id?: string
  taskId?: string
  newDueDate?: Date
  newAssignee?: Users
  newReporter?: Users
  newWatchers?: Users[]
  duplicateEverything?: boolean
  duplicateAttachment?: boolean
  duplicateDescription?: boolean
  duplicateCriteria?: boolean
  duplicateTaskStatus?: boolean
  duplicatePriority?: boolean
  duplicateProject?: boolean
  duplicateRepetitive?: boolean
  duplicateTag?: boolean
}
