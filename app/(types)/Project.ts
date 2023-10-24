import { Tasks } from './Tasks'


export interface ProjectRepsonse {
  _id?: string
  ProjectName?: string
  Assignee?: any[]
  Reporter?: any[]
  Manager?: any[]
  Watcher?: any[]
  Tasks?: Tasks[]
  Customer?: any
  Department?: any
  Description?: string
  __v?: number
  Creator?: string
  Status?: string
}

export interface ProjectRequest {
  _id?: string
  projectName?: string
  assignee?: any[]
  reporter?: any[]
  manager?: any[]
  creator?: string
  creatorName?: string
  createDate?: Date
  userId?: string
  userName?: string
  department?: any
  __v?: number
  status: string
  customer?: string
  description?: string
  watcher?: any[]
}

export interface Summary {
  Count: number
  Status: string
}

export interface TaskSummaryResponse {
  TotalTask: number
  Summary: Summary[]
}
