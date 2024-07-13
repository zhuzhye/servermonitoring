/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent
  export default component
}

export interface GlobConfig {
  title: string
  apiUrl: string
  shortName: string
  urlPrefix?: string
  uploadUrl?: string
  imgUrl?: string
}
export interface tableCondition {
  page: number
  limit: number
}
