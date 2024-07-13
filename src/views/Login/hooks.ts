import { getUserInfo, getUserLogin } from "@/api/Login/login"
import loginStore from "@/stores/Login/login"

import { nextTick, ref } from "vue"
import type { Ref } from "vue"
import { useRouter } from "vue-router"
/**
 * @param {string} ddurl 钉钉回调地址
 * @param {string} appid 扫码登录的appid
 * @returns spinning 加载状态
 */
export const getDDImage = (ddurl: Ref<string>, appid: Ref<string>) => {
  const vueRouter = useRouter()
  let spinning = ref(false)
  //appid去钉钉开放平台里面找
  // redirect_uri   重定向地址。必须与开发者后台设置的回调域名保持一致。
  // 其他参数可以写死（建议去看钉钉开放平台的文档）
  nextTick(() => {
    window.DTFrameLogin(
      {
        id: "login_container",
        width: 300,
        height: 300
      },
      {
        redirect_uri: encodeURIComponent(ddurl.value),
        client_id: appid.value,
        scope: "openid",
        response_type: "code",
        state: "STATE",
        prompt: "consent"
      },
      async (loginResult) => {
        spinning.value = true
        // 这里可以直接进行重定向
        const { authCode, callback } = loginResult

        console.log(callback, "callback")
        const useLoginStore = loginStore()
        const result = await getUserLogin({ authCode })
        if (result.code === 200 && result.data.token) {
          sessionStorage.setItem("token", result.data.token)
          useLoginStore.setToken(result.data.token)
          vueRouter.push("/monitor/tsServices")
          window.removeEventListener("message", callback)
        } else {
          vueRouter.push("/login")
          window.location.reload()
        }
        const infoResult = await getUserInfo()
        if (infoResult.data) {
          useLoginStore.setUserInfo(infoResult.data)
        }
        spinning.value = false
      },
      (errorMsg) => {
        // 这里一般需要展示登录失败的具体原因
        console.log(`Login Error: ${errorMsg}`)
      }
    )
  })

  return { spinning }
}
/**
 * 从 URL 中获取指定参数的值
 * @param paramName 参数名称
 * @param url 要解析的 URL 字符串（可选，默认为当前页面的 URL）
 * @returns 参数的值，如果未找到则返回 null
 */
export function getQueryParam(
  paramName: string,
  url: string = window.location.href
): string | null {
  const params = new URL(url).searchParams
  return params.get(paramName)
}
