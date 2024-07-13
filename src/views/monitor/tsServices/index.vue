<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    :tree-props="{ children: 'children' }"
    :default-sort="{ prop: 'sort', order: '' }"
    default-expand-all
    class="table-container"
    border
  >
    <el-table-column prop="sort" label="排序" show-overflow-tooltip sortable />
    <el-table-column prop="name" label="服务器名" width="180" />
    <el-table-column label="运行状态" prop="runStatus" show-overflow-tooltip>
      <template #default="scope">
        <span
          :class="{
            'color-green': scope.row.runStatus === '0',
            'color-orange': scope.row.runStatus === '1'
          }"
        >
          {{ transRunStatus(scope.row.runStatus) }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="serviceType" label="服务类型" show-overflow-tooltip />
    <el-table-column prop="remark" label="服务备注" show-overflow-tooltip />
    <el-table-column prop="serverBind" label="绑定状态" show-overflow-tooltip>
      <template #default="scope">
        <span
          :class="{
            'color-green': scope.row.serverBind === '0',
            'color-orange': scope.row.serverBind === '1'
          }"
        >
          {{ transServerBind(scope.row.serverBind) }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="netStatus" label="网络状态" show-overflow-tooltip>
      <template #default="scope">
        <span
          :class="{
            'color-green': transNetStatus(scope.row).color === 'green',
            'color-red': transNetStatus(scope.row).color === 'red',
            'color-bule': transNetStatus(scope.row).color === 'blue'
          }"
        >
          {{ transNetStatus(scope.row).label }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="newTime" label="最新时间">
      <template #default="scope">
        <span> {{ transTime(scope.row.newTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="450">
      <template #default="scope">
        <div class="action-box">
          <el-button
            size="small"
            type="success"
            v-if="scope.row.pid === '-1'"
            @click="addLower(scope.row)"
          >
            下级
          </el-button>
          <el-button size="small" v-if="scope.row.pid === '-1'" @click="testFlow">
            测试流量
          </el-button>
          <el-button size="small" v-if="scope.row.serviceType === 'web'"> 查看日志 </el-button>
          <el-button size="small" @click="editServer(scope.row)"> 修改 </el-button>
          <el-button size="small" @click="modifyCondition(scope.row)"> 修改条件 </el-button>
          <el-button size="small" @click="refreshServerModalTip(scope.row)"> 刷新 </el-button>
          <el-button
            size="small"
            v-if="scope.row.serverBind === '1'"
            type="primary"
            @click="bindServerModalTip(scope.row, 0)"
          >
            绑定
          </el-button>
          <el-button
            size="small"
            v-if="scope.row.serverBind !== '1'"
            type="warning"
            @click="bindServerModalTip(scope.row, 1)"
          >
            解绑
          </el-button>
          <el-button size="small" @click="showHistoryRecord(scope.row)"> 历史记录 </el-button>
          <el-button
            size="small"
            v-if="scope.row.isSchedule === '0'"
            type="primary"
            @click="OnOffModalTip(scope.row, 1)"
          >
            开启
          </el-button>
          <el-button
            size="small"
            v-if="scope.row.isSchedule !== '0'"
            type="primary"
            @click="OnOffModalTip(scope.row, 0)"
          >
            关闭
          </el-button>
          <el-button
            size="small"
            v-if="scope.row.serviceType === 'server' && scope.row.isSchedule === '1'"
            type="primary"
            @click="testNetModalTip(scope.row)"
          >
            测试网络
          </el-button>
          <el-button size="small" type="danger" @click="deleteModalTip(scope.row)">
            删除
          </el-button>
          <el-button size="small" type="success" @click="showCommand(scope.row.id)">
            命令
          </el-button>
          <el-button size="small" type="primary" @click="serviceOperation(scope.row, 1)">
            开启服务
          </el-button>
          <el-button size="small" type="primary" @click="serviceOperation(scope.row, 2)">
            关闭服务
          </el-button>
          <el-button size="small" type="primary" @click="serviceOperation(scope.row, 3)">
            重启服务
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <AddServer
    v-model:currentRow="currentRow"
    v-model:addType="addType"
    @getTableData="getTableData"
    ref="addServerRef"
  ></AddServer>
  <ModifyCondition ref="modifyConditionRef"></ModifyCondition>
  <Command ref="commandRef"></Command>
  <HistoryRecord ref="historyRecordRef"></HistoryRecord>
  <TipModal
    v-model:showModal="tipModal.showModal"
    v-model:title="tipModal.title"
    v-model:context="tipModal.context"
    v-model:type="tipModal.type"
    v-model:attrs="tipModal.attrs"
    v-model:width="tipModal.width"
    v-model:loading="tipModal.loading"
    @cancelModal="cancelTipModal"
    @sureModal="sureTipModal"
  >
    <div class="net-box" v-if="tipModal.type === 4">
      <span>服务名:</span>
      <el-input v-model="netLink" style="width: 100%" placeholder="请输入服务名" size="large" />
    </div>
  </TipModal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import AddServer from "./components/AddServer/index.vue"
import ModifyCondition from "./components/ModifyCondition/index.vue"
import Command from "./components/Command/index.vue"
import HistoryRecord from "./components/HistoryRecord/index.vue"
import { organizeData, tableTransComputed } from "./hooks"
import {
  bindServer,
  deleteServer,
  getServiceById,
  getTreeData,
  onOffServer,
  refreshServer,
  serviceCondition,
  testNetStatus,
  updateServer
} from "@/api/monitor/tsServices"
import type { ITipModal, tableDataType } from "./types"
import { storeToRefs } from "pinia"
import tsServicesStore from "@/stores/monitor/tsServices"
import type { tableList } from "@/api/monitor/tsServices/types"
import type { IAddServer, IAddType } from "./components/AddServer/type"
import TipModal from "../../TipModal/index.vue"
import { ElMessage } from "element-plus"
let tableData = ref<tableDataType[]>()
let currentRow = ref<tableDataType>()
let tipModal = reactive<ITipModal>({
  title: "",
  context: "",
  showModal: false
})
const useTsServicesStore = tsServicesStore()
//table表的computed转化
const { commandModal, historyModal, addServerModal, modifyConditionModal, testFlowModal } =
  storeToRefs(useTsServicesStore)
//table表格数据
const { transRunStatus, transNetStatus, transServerBind, transTime } = tableTransComputed()
/**
 * @description 获取表格数据
 */
const getTableData = async () => {
  const treeData: tableList = await getTreeData()
  if (treeData.data.list) {
    tableData.value = organizeData(treeData.data.list)
  }
}
onMounted(async () => {
  getTableData()
})
/**
 * @description 下级 、 修改
 */
let addType = ref<IAddType>()
const addLower = (row: tableDataType) => {
  addServerModal.value = true
  addType.value = 0
  currentRow.value = row
}
let addServerRef = ref<InstanceType<typeof AddServer>>()
const editServer = async (row: tableDataType) => {
  currentRow.value = row
  if (row.pid !== "-1") {
    addType.value = 1
  } else {
    addType.value = 2
  }
  const result = await getServiceById<{ data: IAddServer }>({ serviceId: row.id })
  addServerRef.value?.setFormData(result.data)
  addServerModal.value = true
}
/**
 * @description 测试流量
 */
const testFlow = () => {
  testFlowModal.value = true
}
/**
 * @description 修改条件
 */
let modifyConditionRef = ref<InstanceType<typeof ModifyCondition>>()
const modifyCondition = async (row: tableDataType) => {
  modifyConditionModal.value = true
  try {
    const result = await serviceCondition({ serviceId: row.id })
    console.log(result, "result")
    modifyConditionRef.value?.setFrom(result.data, row.id)
  } catch (error) {
    ElMessage({
      message: "查询失败",
      type: "error"
    })
  }
}
/**
 * @description 刷新
 */
const refreshServerModalTip = (row: tableDataType) => {
  currentRow.value = row
  tipModal.showModal = true
  tipModal.context = "是否刷新服务器状态"
  tipModal.title = "信息"
  tipModal.type = 1
}
/**
 * @description 绑定、解绑
 */
const bindServerModalTip = async (row: tableDataType, type: number) => {
  currentRow.value = row
  tipModal.showModal = true
  tipModal.context = type === 0 ? "是否绑定?" : "是否解除绑定?"
  tipModal.title = "信息"
  tipModal.type = 3
  tipModal.attrs = { postType: type }
}
/**
 * @description 命令
 */
let commandRef = ref<InstanceType<typeof Command>>()
const showCommand = (id: string) => {
  commandModal.value = true
  commandRef.value?.getCommondInfo(id)
}
/**
 * @description 历史记录
 */
let historyRecordRef = ref<InstanceType<typeof HistoryRecord>>()
const showHistoryRecord = (row: tableDataType) => {
  historyModal.value = true
  historyRecordRef.value?.getHistoryRecordRow(row)
}
/**
 * @description 开启、关闭
 */
const OnOffModalTip = (row: tableDataType, type: number) => {
  currentRow.value = row
  tipModal.showModal = true
  tipModal.context = type === 1 ? "是否开启?" : "是否关闭?"
  tipModal.title = "信息"
  tipModal.type = 2
  tipModal.attrs = { postType: type }
}
/**
 * @description 测试网络
 */
let netLink = ref<string>("www.baidu.com")
const testNetModalTip = (row: tableDataType) => {
  currentRow.value = row
  tipModal.showModal = true
  tipModal.title = "测试地址"
  tipModal.width = "350"
  tipModal.type = 4
  netLink.value = "www.baidu.com"
}
/**
 * @description 删除
 */
const deleteModalTip = (row: tableDataType) => {
  currentRow.value = row
  tipModal.showModal = true
  tipModal.context = "确定删除吗？"
  tipModal.title = "信息"
  tipModal.type = 0
}
const deleteData = async () => {
  if (currentRow.value) {
    await deleteServer({ id: currentRow.value.id })
    getTableData()
    tipModal.showModal = false
  }
}
/**
 * @description 开启服务
 */
const serviceOperation = async (row: tableDataType, type: number) => {
  const result = await updateServer({ id: row.id, type: type })
  ElMessage({
    message: result.data.data,
    type: "success"
  })
}
/**
 * @description 提示框方法
 */
const cancelTipModal = () => {
  tipModal.showModal = false
  tipModal.loading = false
}
const sureTipModal = async (type: number, attrs: Record<string, any>) => {
  //删除
  if (type === 0) {
    deleteData()
    //刷新服务
  } else if (type === 1) {
    if (currentRow.value) {
      await refreshServer({ serviceId: currentRow.value.id })
      tipModal.showModal = false
      getTableData()
    }
    //开启关闭
  } else if (type === 2) {
    if (currentRow.value) {
      try {
        const result = await onOffServer({ id: currentRow.value.id, isSchedule: attrs.postType })
        ElMessage({
          message: result.data.result.msg,
          type: result.data.result.code === 200 ? "success" : "error"
        })
      } catch (error) {
        ElMessage({
          message: "操作失败",
          type: "error"
        })
      }
      tipModal.showModal = false
      getTableData()
    }
    //开启关闭
  } else if (type === 3) {
    if (currentRow.value) {
      try {
        const result = await bindServer({ id: currentRow.value.id, serverBind: attrs.postType })
        ElMessage({
          message: result.data.result.msg,
          type: result.data.result.code === 200 ? "success" : "error"
        })
      } catch (error) {
        ElMessage({
          message: "操作失败",
          type: "error"
        })
      }
      tipModal.showModal = false
      getTableData()
    }
  } else if (type === 4) {
    if (currentRow.value) {
      tipModal.loading = true
      await testNetStatus({ id: currentRow.value.id, link: netLink.value })
      tipModal.loading = false
      tipModal.showModal = false
      getTableData()
    }
  }
}
</script>
<style lang="scss" scoped>
.color-green {
  color: #168f48;
}
.color-orange {
  color: #ff5722;
}
.color-bule {
  color: #0000ff;
}
.color-red {
  color: red;
}
.action-box {
  display: flex;
  flex-wrap: wrap;
}

.action-box .el-button {
  flex: 0 0 calc(15% - 10px); /* 16.66% is 1/6 of the width, 10px is the space between buttons */
  margin: 3px;
}
.table-container {
  :deep(.el-table__row--level-0) {
    background-color: #d0d6ea;
  }
  :deep(.el-table__row--level-1),
  :deep(.el-table__row--level-2),
  :deep(.el-table__row--level-3),
  :deep(.el-table__row--level-4),
  :deep(.el-table__row--level-5),
  :deep(.el-table__row--level-6) {
    background-color: #d0d6ea54;
  }
}
.net-box {
  display: flex;
  padding: 20px 20px 5px 20px;
  width: 100%;

  align-items: center;
  span {
    margin-right: 15px;
    white-space: nowrap;
  }
}
</style>
