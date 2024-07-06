import { http } from "@/utils/http/axios"

export const getUserLogin = (params: { authCode: string }) => {
  return http.request(
    {
      url: "/dingDingLogin",
      method: "GET",
      params
    },
    { isShowSuccessMessage: false }
  )
}
