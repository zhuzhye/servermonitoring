import type { ICommandData } from "@/api/monitor/tsServices/types"

export interface ICommand extends ICommandData {
  user?: string
}
