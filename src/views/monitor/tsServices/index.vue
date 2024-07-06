<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    :tree-props="{ children: 'children' }"
    :default-sort="{ prop: 'sort', order: '' }"
    default-expand-all
    :row-class-name="tableRowClassName"
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
          <el-button size="small" type="success" v-if="scope.row.pid === '-1'" > 下级 </el-button>
          <el-button size="small" v-if="scope.row.serviceType === 'web'"> 查看日志 </el-button>
          <el-button size="small"> 修改 </el-button>
          <el-button size="small"> 修改条件 </el-button>
          <el-button size="small"> 刷新 </el-button>
          <el-button size="small" v-if="scope.row.serverBind === '1'" type="primary"
            >绑定</el-button
          >
          <el-button size="small" v-if="scope.row.serverBind !== '1'" type="warning"
            >解绑</el-button
          >
          <el-button size="small"> 历史记录 </el-button>

          <el-button size="small" v-if="scope.row.isSchedule === '0'" type="primary">
            开启
          </el-button>
          <el-button size="small" v-if="scope.row.isSchedule !== '0'" type="primary">
            关闭
          </el-button>
          <el-button
            size="small"
            v-if="scope.row.serviceType === 'server' && scope.row.isSchedule === '1'"
            type="primary"
          >
            测试网络
          </el-button>
          <el-button size="small" type="danger"> 删除 </el-button>
          <el-button size="small" type="success"> 命令 </el-button>
          <el-button size="small" type="primary"> 开启服务 </el-button>
          <el-button size="small" type="primary"> 关闭服务 </el-button>
          <el-button size="small" type="primary"> 重启服务 </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <AddServer></AddServer>
  <TestFlow></TestFlow>
  <Command></Command>
  <HistoryRecord></HistoryRecord>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import AddServer from "./components/AddServer/index.vue"
import TestFlow from "./components/TestFlow/index.vue"
import Command from "./components/Command/index.vue"
import HistoryRecord from "./components/HistoryRecord/index.vue"
import tableDatas from "@/mock/table"
import { organizeData, tableTransComputed } from "./hooks"

//table表格数据
const tableData = ref(organizeData(tableDatas.data.list))
const { transRunStatus, transNetStatus, transServerBind, transTime } = tableTransComputed()
const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
  if (rowIndex === 1) {
    return "warning-row"
  } else if (rowIndex === 3) {
    return "success-row"
  }
  return ""
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
  :deep(.el-table__row--level-1) {
    background-color: #d0d6ea54;
  }
}
</style>
