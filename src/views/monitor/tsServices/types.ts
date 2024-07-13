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

export interface ITipModal {
  title: string
  showModal: boolean
  width?: string
  top?: string
  context?: string
  type?: ITipType
  attrs?: Record<string, any>
  loading?: boolean
}
export const enum ITipType {
  DELETE,
  REFRESH,
  ONOFF,
  BIND,
  TESTNET,
  Other
}
