<template>
  <div class="addserver-dialog">
    <el-dialog
      v-model="historyModal"
      title="历史记录"
      width="100%"
      top="5vh"
      @close="closeModal"
      draggable
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button color="#009688" @click="closeModal"> 关闭 </el-button>
        </div>
      </template>
      <el-form :inline="true" :model="queryTableParams" ref="formRef">
        <el-form-item label="运行状态" prop="runStatus">
          <el-select
            v-model="queryTableParams.runStatus"
            placeholder="——运行状态——"
            style="width: 200px"
            clearable
          >
            <el-option key="1" label="停止" value="1" />
            <el-option key="0" label="正常" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker
            clearable
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
            v-model="queryTableParams.time"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData" :icon="Search">查询</el-button>
          <el-button @click="restQuery" :icon="RefreshRight">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
        :default-sort="{ prop: 'sort', order: '' }"
        default-expand-all
        border
        :data="tableData"
        table-layout="auto"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="" width="50" :index="1" />
        <el-table-column prop="serverAddress" label="服务地址">
          <template #default="scope">
            {{ transServerAddress(scope.row.serverAddress) }}
          </template>
        </el-table-column>
        <el-table-column prop="runStatus" label="运行状态">
          <template #default="scope">
            <span :style="`color:${transRunStatus(scope.row.runStatus).color}`">
              {{ transRunStatus(scope.row.runStatus).label }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="cpuOccupancy"
          label="CPU占用率"
          v-if="!displayNone?.includes('cpuOccupancy')"
        />
        <el-table-column
          prop="memoryOccupancy"
          label="内存占用率"
          v-if="!displayNone?.includes('memoryOccupancy')"
        />
        <el-table-column
          prop="hardOccupancy"
          label="硬盘占用"
          v-if="!displayNone?.includes('hardOccupancy')"
        />
        <el-table-column
          prop="netStatus"
          label="网络状态"
          v-if="!displayNone?.includes('netStatus')"
        >
          <template #default="scope">
            <span :style="`color:${transNetStatus(scope.row, rowData).color}`">
              {{ transNetStatus(scope.row, rowData).label }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="logsSize" label="日志大小" v-if="rowData.serviceType === 'web'">
          <template #default="scope">
            <span :style="`color:${transLogsSize(scope.row, rowData).color}`">
              {{ transLogsSize(scope.row, rowData).label }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间">
          <template #default="scope">
            {{ transCreateTime(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="runTime" label="运行时间" v-if="!displayNone?.includes('runTime')" />
        <el-table-column
          prop="maxCpuPID"
          label="CPU占用最高的PID"
          v-if="!displayNone?.includes('maxCpuPID')"
        />
        <el-table-column
          prop="dateStr"
          label="服务器和系统时间"
          v-if="!displayNone?.includes('dateStr')"
          width="150"
        />
        <el-table-column prop="cusContent" label="自定义命令内容" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-tag color="#FC764B" style="color: #fff" @click="showSplitInfo(scope.row.disks)">
              分盘详细信息
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="bt-page"
        v-model:current-page="tableSet.page"
        v-model:page-size="tableSet.limit"
        :page-sizes="[10, 20, 30, 40]"
        layout=" prev, pager, sizes,total, next, jumper"
        :total="tableSet.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-dialog>
    <SplitInformation ref="SplitInformationRef"></SplitInformation>
  </div>
</template>
<script lang="ts" setup>
import { historyRecordList } from "@/api/monitor/tsServices"
import tsServicesStore from "@/stores/monitor/tsServices"
import { storeToRefs } from "pinia"
import { computed, reactive, ref } from "vue"
import SplitInformation from "./components/SplitInformation.vue"
import type { tableDataType } from "../../types"
import type { IDisk, IHistoryRecordTable, ITableQueryParams, ItableSet } from "./types"
import { tableTransComputed } from "./hooks"
import dayjs from "dayjs"
import type { FormInstance } from "element-plus"
import { Search, RefreshRight } from "@element-plus/icons-vue"
import { judgeNone } from "./hooks"
const useTsServicesStore = tsServicesStore()
const { historyModal, historySplitModal } = storeToRefs(useTsServicesStore)
let tableSet = reactive<ItableSet>({
  page: 1,
  limit: 10,
  total: 0
})

let queryTableParams = reactive<ITableQueryParams>({
  page: computed(() => tableSet.page),
  limit: computed(() => tableSet.limit)
})
let rowData = ref<tableDataType>({} as tableDataType)
let tableData = ref<IHistoryRecordTable[]>()
const displayNone = judgeNone(rowData.value.serviceType)

/**
 * @description:table表数据转换
 */
const { transNetStatus, transRunStatus, transServerAddress, transLogsSize, transCreateTime } =
  tableTransComputed()

/**
 * @param {number} val 每页大小改变
 * @description: 分页
 */
const handleSizeChange = (val: number) => {
  tableSet.limit = val
  getHistoryTable()
}
/**
 * @param {number} val 当前页改变
 * @description: 分页
 */
const handleCurrentChange = (val: number) => {
  tableSet.page = val
  getHistoryTable()
}
/**
 * @description 查询历史数据
 */
const getHistoryTable = async () => {
  let handleQueryParms: ITableQueryParams = {} as ITableQueryParams
  for (let key in queryTableParams) {
    if (key !== "time") {
      handleQueryParms[key] = queryTableParams[key]
    }
  }
  if (queryTableParams.time && queryTableParams.time.length > 0) {
    handleQueryParms.startTime = dayjs(queryTableParams.time[0]).format("YYYY-MM-DD HH:mm:ss")
    handleQueryParms.endTime = dayjs(queryTableParams.time[1]).format("YYYY-MM-DD HH:mm:ss")
  }
  const result = await historyRecordList(handleQueryParms)
  tableData.value = result.data.list
  tableSet.total = result.data.count
}
/**
 * @param {object} data  通过父组件传值获取单行信息
 * @description 查询历史数据
 */
const getHistoryRecordRow = (data: tableDataType) => {
  queryTableParams.id = data.id
  rowData.value = data
  getHistoryTable()
}
/**
 * @description 查询
 */
const queryData = () => {
  tableSet.page = 1
  getHistoryTable()
}

const formRef = ref<FormInstance>()
/**
 * @description: 重置
 */
const restQuery = () => {
  tableSet.page = 1
  console.log(formRef, "formRef")
  if (formRef.value) {
    formRef.value.resetFields()
  }
  getHistoryTable()
}
/**
 * @description: 显示分盘详情
 */
let SplitInformationRef = ref<InstanceType<typeof SplitInformation>>()
const showSplitInfo = (disk: IDisk[]) => {
  historySplitModal.value = true
  SplitInformationRef.value?.setTableData(disk)
}
/**
 * @description: 关闭弹框
 */
const closeModal = () => {
  historyModal.value = false
  if (formRef.value) {
    formRef.value.resetFields()
  }
  tableData.value = []
}
defineExpose({
  getHistoryRecordRow
})
</script>
<style lang="scss" scoped>
.addserver-dialog {
  :deep(.el-dialog) {
    padding: 0 0 20px 0;
    overflow: auto;
    .el-dialog__header {
      background: #191b21;
      display: flex;
      .el-dialog__title {
        color: var(--menu-color);
        font-size: 14px;
        padding: 13px 0 0 30px;
      }
      .el-dialog__headerbtn {
        font-size: 25px;
        padding: 10px;
      }
    }
    .el-dialog__body {
      padding: 20px 30px;
    }
    .dialog-footer {
      padding-right: 40px;
      padding-bottom: 10px;
    }
    :deep(.el-dialog__body) {
      display: flex;
      width: 100%;
      .el-form {
        width: 91%;
        margin: auto;
      }
    }
  }
  .form-dialog {
    padding: 30px 40px 0 40px;
    :deep(.el-form-item__label) {
      margin: auto !important;
      font-weight: 500;
    }
  }
  .bt-page {
    margin-top: 10px;
    justify-content: right;
    margin-right: 40px;
  }
}
</style>
