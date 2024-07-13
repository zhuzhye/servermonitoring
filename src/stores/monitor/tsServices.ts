import { defineStore } from "pinia"
interface ItsServices {
  commandModal: Boolean
  historyModal: Boolean
  historySplitModal: Boolean
  addServerModal: Boolean
  modifyConditionModal: Boolean
  testFlowModal: Boolean
}
const tsServicesStore = defineStore("tsServices", {
  state: (): ItsServices => ({
    commandModal: false,
    historyModal: false,
    historySplitModal: false,
    addServerModal: false,
    modifyConditionModal: false,
    testFlowModal: false
  }),
  actions: {}
})
export default tsServicesStore
