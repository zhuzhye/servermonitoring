export type ListItem = Root2[]

export interface Root2 {
  icon: string
  name: string
  subMenus?: SubMenu[]
  url: string
}
export interface SubMenu {
  icon: string
  name: string
  url: string
}
