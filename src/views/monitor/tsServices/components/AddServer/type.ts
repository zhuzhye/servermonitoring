export interface IAddServer {
  id: string
  name: string
  serviceType: string
  scriptPath: string
  oomPath: string
  databaseName: string
  serverAddress: string
  username: string
  passward: string
  logsLocation: string
  telePhone: string
  heartPath: string
  remark: string
  cusCommand: string
  pid: string
  _method?: string
}
export const enum IAddType {
  AddLow,
  EditLow,
  AddNew,
  Edit
}
export interface IselectList {
  label: string
  value: string
}
