import { computed } from "vue"
import type { tableDataType } from "../../types"
import type { IHistoryRecordTable } from "./types"
import dayjs from "dayjs"

export const judgeNone = (serviceType: string) => {
  if (
    serviceType === "web" ||
    serviceType === "mq" ||
    serviceType === "redis" ||
    serviceType === "fastfds" ||
    serviceType === "nginx" ||
    serviceType === "mysql"
  ) {
    return [
      "cpuOccupancy",
      "memoryOccupancy",
      "hardOccupancy",
      "netStatus",
      "runTime",
      "maxCpuPID",
      "dateStr"
    ]
  }
  return []
}
/**
 * @returns { transNetStatus, transRunStatus, transServerAddress } table表格数据转换类型
 */
export const tableTransComputed = () => {
  const transNetStatus = computed(() => {
    return function (data: IHistoryRecordTable, rowData: tableDataType) {
      console.log(data.netStatus, rowData.serviceType, "rowDatarowData")
      if (rowData.serviceType === "server") {
        if (rowData.isSchedule === "1") {
          if (String(data.netStatus) === "1") {
            return { color: "red", label: "停止" }
          } else if (String(data.netStatus) === "0") {
            if (String(data.avgTime) === "undefined") {
              return { color: "#00FF00", label: "正常" }
            } else {
              return { color: "#00FF00", label: "正常/" + data.avgTime + "ms" }
            }
          } else {
            return { color: "#0000FF", label: "未检测" }
          }
        } else {
          return { color: "#0000FF", label: "" }
        }
      } else {
        return { color: "#0000FF", label: "" }
      }
    }
  })
  const transRunStatus = computed(() => {
    return function (data: string) {
      if (data === "1") {
        return { color: "red", label: "停止" }
      } else if (data === "0") {
        return { color: "#00FF00", label: "正常" }
      }
      return { color: "", label: "" }
    }
  })
  const transServerAddress = computed(() => {
    return function (data: string) {
      let split = data.split(",")
      return split[0]
    }
  })
  const transLogsSize = computed(() => {
    return function (data: IHistoryRecordTable, rowData: tableDataType) {
      if (rowData && rowData.serviceType === "web") {
        if (String(data.logsSize) === "undefined") {
          return { color: "#00FF00", label: "" }
        } else {
          return { color: "#00FF00", label: data.logsSize }
        }
      } else {
        return { color: "#00FF00", label: "" }
      }
    }
  })
  const transCreateTime = computed(() => {
    return function (data: number) {
      if (data) {
        return dayjs(data).format("YYYY-MM-DD HH:mm:ss")
      }
      return ""
    }
  })
  return { transNetStatus, transRunStatus, transServerAddress, transLogsSize, transCreateTime }
}
