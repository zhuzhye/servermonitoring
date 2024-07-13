import type { ILoginState, IuserInfoData } from "@/api/Login/type"
import { defineStore } from "pinia"
const loginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: "",
    userInfo: {}
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(payload: IuserInfoData) {
      this.$patch((state) => {
        Object.assign(state, { userInfo: payload })
      })
    }
  }
})
export default loginStore
