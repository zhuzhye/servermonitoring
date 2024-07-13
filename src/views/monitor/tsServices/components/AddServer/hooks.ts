import { computed } from "vue"
import type { IAddType, IselectList } from "./type"
export const getTitle = (addType: number) => {
  return computed(() => {
    return addType === 0
      ? "添加服务器"
      : addType === 1
        ? "修改服务"
        : addType === 2
          ? "添加服务器"
          : "修改服务器"
  })
}

export const serverType = (type: IAddType): IselectList[] => {
  console.log(type, "type")
  if (type === 0) {
    return [
      {
        value: "web",
        label: "web"
      },
      {
        value: "pgsql",
        label: "pgsql"
      },
      {
        value: "mysql",
        label: "mysql"
      },
      {
        value: "redis",
        label: "redis"
      },
      {
        value: "nginx",
        label: "nginx"
      },
      {
        value: "fastfds",
        label: "fastfds"
      },
      {
        value: "mq",
        label: "mq"
      },
      {
        value: "tomcat",
        label: "tomcat"
      },
      {
        value: "其他类型",
        label: "其他类型"
      }
    ]
  } else {
    return [
      {
        value: "server",
        label: "server"
      },
      {
        value: "windows",
        label: "windows"
      }
    ]
  }
}
