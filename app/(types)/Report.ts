import { StatusCategory } from "./Categories"
import { Department } from "./Department"

export interface PersonalScoreRequest {
  userId?: string
  department?: string
  baseOnWeek?: number
  baseOnMonth?: number
  baseOnYear?: number
  fromDate?: Date
  toDate?: Date
  previousWeek?: number
  previousMonth?: number
  monthly?: boolean
  quarterly?: boolean
  getAll?: number
  groupId?: string
  projectId?: string
  departmentId?: string

}

export interface PersonalScoreResponse {
  _id?: string
  Department?: string
  FirstName?: string
  LastName?: string
  TotalScore?: number
  Rank?: number
  UserCount?: number
}

export interface ScoreRankingRequest {
  department: string
  baseOnWeek?: number
  baseOnMonth?: number
  baseOnYear?: number
  fromDate?: Date
  toDate?: Date
  previousWeek?: number
  previousMonth?: number

}

export interface ScoreRankingResponse {
  _id?: string
  Department: string
  FirstName: string
  LastName: string
  TotalScore?: number
  Rank?: number
  UserCount?: number
  Task?: any[]
}

export interface TrustScoreRequest {
  assignee?: string
  reporter?: string
}

export interface TrustScoreResponse {
  Score: number
  Department: string
  FirstName: string
  LastName: string
  Rank: number
}
export interface ReportsResponse {
  AssigneeName: string
  CompletedTask?: number
  EndJoinProjectDate?: string
  IncompletedTask?: number
  Index?: number
  InprogressOrDoneTask?: number
  ProjectName?: string
  StartJoinProjectDate?: string
  TotalTask?: number
  NonProjectTask?: number
  AvailableDate?: Date
  CompleteTaskPercentage?: number
  DepartmentName?: string
  ProjectInvolve?: number
  TaskName?: string
  DueDate?: Date
  RoleName?: string
  StatusName?: string
  _id?: string
  Name?: string
  TotalAccress?: number
  TotalUser?: number
  Week?: number
  CreatedWeek?: number
  AverageTime?: number
  TotalSum?: number
}

export interface ScoreDetailResponse {
  _id: any
  TaskName: string
  StatusCategory?: StatusCategory
  Score?: number
  DoneDate?: string
}

// export interface Report0102Response {
//   Name?:string
//   TotalAccress?: number
//   TotalUser?:number
//   Week?:number
// }

// export interface ReportAverageTimeResponse {
//   Name?: string
//   TotalAccress?: number
//   TotalUser?: number
//   Week?: number
// }