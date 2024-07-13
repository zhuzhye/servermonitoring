export interface IUserInfo {
  code: number
  data?: IuserInfoData
  msg: string
}

export interface IuserInfoData {
  createTime?: string
  email?: string
  id?: string
  nickName?: string
  phone?: string
  sex?: string
  state?: number
  updateTime?: string
  username?: string
}

export interface ILoginState {
  token: string
  userInfo: IuserInfoData
}
