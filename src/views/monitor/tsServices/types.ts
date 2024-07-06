export interface tableDataType {
  createTime: number
  id: string
  isSchedule: string
  name: string
  newTime: number
  pid: string
  remark: string
  runStatus: string
  serverBind: string
  serviceType: string
  sort: number
  avgTime?: string
  netStatus?: string
  children?: tableDataType[]
}
