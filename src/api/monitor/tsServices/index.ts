import { http } from "@/utils/http/axios"
import type { ICommandType, ITestFlow, tableList } from "./types"
import { transFromData } from "@/utils/http/axios/utils"
import { ContentTypeEnum } from "@/utils/http/axios/httpEnum"
import type { ITableQueryParams } from "@/views/monitor/tsServices/components/HistoryRecord/types"
import type { IAddServer } from "@/views/monitor/tsServices/components/AddServer/type"
import type { IModifyCondition } from "@/views/monitor/tsServices/components/ModifyCondition/type"

export const getTreeData = () => {
  return http.request<tableList>(
    {
      url: "/service/getTree",
      method: "GET"
    },
    { isShowSuccessMessage: false }
  )
}
//获取命令列表
export const getCommond = <T = any>(params: T) => {
  return http.request<ICommandType>(
    {
      url: "/service/getCommond",
      method: "GET",
      params
    },
    { isShowSuccessMessage: false }
  )
}
//发送命令请求
export const arrangement = <T extends Record<string, any>>(postdata: T) => {
  return http.request(
    {
      url: "/service/arrangement",
      method: "POST",
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA
      },
      params: transFromData(postdata)
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}
// 获取历史记录
export const historyRecordList = (params: ITableQueryParams) => {
  return http.request(
    {
      url: "/servicesStatus/selectLike",
      method: "GET",
      params
    },
    {
      isShowSuccessMessage: false,
      isShowErrorMessage: true
    }
  )
}

//添加下级server
export const addServer = (postdata: IAddServer) => {
  return http.request(
    {
      url: "/service",
      method: "POST",
      params: transFromData(postdata),
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA
      }
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}

//获取server信息
export const getServiceById = <T>(params: { serviceId: string }) => {
  return http.request<T>(
    {
      url: "/service/getServiceById",
      method: "GET",
      params
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true,
      isReturnNativeResponse: true
    }
  )
}

//删除server

export const deleteServer = (params: { id: string }) => {
  return http.request(
    {
      url: "/service/delete",
      method: "GET",
      params
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}

//重启，关闭，开启服务
export const updateServer = (params: { id: string; type: number }) => {
  return http.request(
    {
      url: "/service/rebootService",
      method: "POST",
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA
      },
      params
    },
    {
      isShowErrorMessage: true,
      isReturnNativeResponse: true
    }
  )
}
//刷新服务
export const refreshServer = (params: { serviceId: string }) => {
  return http.request(
    {
      url: "/service/refresh",
      method: "GET",
      params
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}

//开启、关闭
export const onOffServer = (params: { id: string; isSchedule: number }) => {
  return http.request(
    {
      url: "/service/updateIsSchedule",
      method: "POST",
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA
      },
      params
    },
    {
      isReturnNativeResponse: true
    }
  )
}
// 绑定、解绑
export const bindServer = (params: { id: string; serverBind: number }) => {
  return http.request(
    {
      url: "/service/updateBindState",
      method: "GET",
      params
    },
    {
      isReturnNativeResponse: true
    }
  )
}

//获取修改条件页面数据
export const serviceCondition = (params: { serviceId: string }) => {
  return http.request(
    {
      url: "/service/getServiceConditionsById",
      method: "GET",
      params
    },
    {
      isReturnNativeResponse: true
    }
  )
}

//修改条件页面修改数据
export const updateServiceConnection = (params: IModifyCondition) => {
  return http.request(
    {
      url: "/service/saveConditionsById",
      method: "POST",
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA
      },
      params
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}
//测试网络
export const testNetStatus = (params: { id: string; link: string }) => {
  return http.request(
    {
      url: "/service/testNetStatus",
      method: "POST",
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA
      },
      params
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}

//测试流量
export const testFlowData = (params: ITestFlow) => {
  return http.request(
    {
      url: "/service/testFlow",
      method: "GET",
      params
    },
    {
      isShowSuccessMessage: true,
      isShowErrorMessage: true
    }
  )
}

//查看日志
export const getViewLog = (params: { serviceId: string }) => {
  return http.request(
    {
      url: "/service/lookLog",
      method: "GET",
      params
    },
    {
      isReturnNativeResponse: true
    }
  )
}
