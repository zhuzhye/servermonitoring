import type { tableDataType } from "@/views/monitor/tsServices/types"

export interface tableList {
  data: {
    list?: tableDataType[]
  }
}
export interface ICommandType {
  code: number
  data?: ICommandData
  msg: string
}

export interface ICommandData {
  id: string
  offCommond: string
  rebootCommond: string
  turnCommond: string
}
