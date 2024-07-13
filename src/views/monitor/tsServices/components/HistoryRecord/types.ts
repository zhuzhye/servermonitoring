import type { tableCondition } from "env"
import type { ComputedRef } from "vue"
export interface IForm {
  runStatus?: string
  time?: Date[]
}
export interface ITableQueryParams extends IForm {
  id?: string
  page: ComputedRef<number> | number
  limit: ComputedRef<number> | number
  startTime?: string
  endTime?: string
}
export interface ItableSet extends tableCondition {
  total: number
}
export interface IDisk {
  fileSystem: string
  total: string
  used: string
}

export interface IHistoryRecordTable {
  avgTime: string
  createTime: number
  creator: string
  del: number
  disks: IDisk[]
  id: string
  netStatus: string
  runStatus: string
  serverAddress: string
  servicesId: string
  statusTime: number
  updateTime: number
  updator: string
  connectNum?: number
  cpuOccupancy?: string
  cusContent?: string
  dateStr?: string
  diskMsg?: string
  hardOccupancy?: string
  maxCpuPID?: string
  memoryOccupancy?: string
  runTime?: string
  logsSize?: string
}
