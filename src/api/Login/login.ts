import { http } from "@/utils/http/axios"
import type { IUserInfo } from "./type"

export const getUserLogin = (params: { authCode: string }) => {
  return http.request(
    {
      url: "/dingDingLogin",
      method: "GET",
      params
    },
    {
      successMessageText: "登录成功",
      errorMessageText: "登录失败"
    }
  )
}

export const getUserInfo = () => {
  return http.request<IUserInfo>(
    {
      url: "/userInfo",
      method: "GET"
    },
    {
      errorMessageText: "获取用户信息失败"
    }
  )
}
