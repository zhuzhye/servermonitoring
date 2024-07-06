import { computed } from "vue"
import type { tableDataType } from "./types"
import dayjs from "dayjs"
export function organizeData(data: tableDataType[]): tableDataType[] {
  // 创建一个map来存储id到对象的映射
  const map: { [key: string]: tableDataType } = {}
  // 用于存储最终的树结构
  const result: tableDataType[] = []

  // 构建映射，并初始化每个对象的children数组
  data.forEach((item) => {
    map[item.id] = { ...item }
  })
  // 构建树结构
  data.forEach((item) => {
    if (item.pid === "-1") {
      // 如果pid为-1，则表示这是顶级节点，添加到结果中
      result.push(map[item.id])
    } else {
      let parent = map[item.pid]
      if (parent.children) {
        parent.children.push(map[item.id])
      } else {
        map[item.pid].children = [map[item.id]]
      }
    }
  })
  return result
}

export const tableTransComputed = () => {
  //运行状态
  const transRunStatus = computed(() => {
    return function (data: string) {
      return data === "0" ? "正常" : data === "1" ? "停止" : "未检测"
    }
  })
  //绑定状态
  const transServerBind = computed(() => {
    return function (data: string) {
      return data === "0" ? "已绑定" : "未绑定"
    }
  })
  //网络状态
  const transNetStatus = computed(() => {
    return function (data: tableDataType) {
      if (String(data.serviceType) === "server" && String(data.runStatus) === "0") {
        if (String(data.isSchedule) === "1") {
          if (String(data.netStatus) === "1") {
            return { label: "停止", color: "red" }
          } else if (String(data.netStatus) === "0") {
            if (String(data.avgTime) === "undefined") {
              return { label: "正常", color: "green" }
            } else {
              return { label: "正常/" + data.avgTime + "ms", color: "green" }
            }
          } else {
            return { label: "未检测", color: "blue" }
          }
        } else {
          return { label: "未开启", color: "blue" }
        }
      } else {
        return { label: "", color: "" }
      }
    }
  })
  //最新时间
  const transTime = computed(() => {
    return function (data: number) {
      return dayjs(data).format("YYYY-MM-DD HH:mm:ss")
    }
  })
  return { transRunStatus, transNetStatus, transServerBind, transTime }
}
