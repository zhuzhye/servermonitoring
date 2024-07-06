<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    :tree-props="{ children: 'children' }"
    :default-sort="{ prop: 'sort', order: '' }"
    default-expand-all
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
      <template #default>
        <div class="action-bottom">
          <el-button size="small" type="success"> 下级 </el-button>
          <el-button size="small"> 修改 </el-button>
          <el-button size="small"> 修改条件 </el-button>
          <el-button size="small"> 刷新 </el-button>
          <el-button size="small"> 历史记录 </el-button>
          <el-button size="small" type="primary"> 开启 </el-button>
        </div>
        <div>
          <el-button size="small" type="danger"> 删除 </el-button>
          <el-button size="small" type="success"> 命令 </el-button>
          <el-button size="small" type="primary"> 开启服务 </el-button>
          <el-button size="small" type="primary"> 关闭服务 </el-button>
          <el-button size="small" type="primary"> 重启服务 </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
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
</script>
<style lang="scss" scoped></style>
