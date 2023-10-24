export interface Assignee {
  _id: string
  UserName: string
  Name: string
  Role: string
  Department: string
  Color: string
  __v: number
  FirstName: string
  Group: string[]
  LastName: string
}
export interface Reporter {
  _id: string
  UserName: string
  Name: string
  Role: string
  Department: string
  Color: string
  __v: number
  FirstName: string
  Group: string[]
  LastName: string
}
export interface StatusCategory {
  _id: string
  Type: string
  Level: number
  Name: string
  CategoryId: number
  Color: string
  Disabled: boolean
}

export interface PriorityCategory {
  _id: string
  Type: string
  Level: number
  Name: string
  CategoryId: number
  Color: string
  Disabled: boolean
}
export interface Project {
  _id: string
  ProjectName: string
  Assignee: string[]
  Reporter: string[]
  Manager: string[]
  Creator: string
  CreateDate: string
  Status: string
  Customer: string
  Description: string
  __v: number
}
