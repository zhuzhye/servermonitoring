<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      :default-sort="{ prop: 'sort', order: '' }"
      default-expand-all
      border
    >
      <el-table-column prop="projectName" label="项目名称" />
      <el-table-column prop="scheduleName" label="定时器名称" show-overflow-tooltip />
      <el-table-column prop="updateTime" label="最新执行时间">
        <template #default="scope">
          <span>{{ transTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="states" label="状态" />
      <el-table-column prop="timeInterval" label="超时间隔(分钟)"> </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip />
      <el-table-column prop="action" label="操作" width="200">
        <el-button size="small" color="#1E9FFF" class="btn-white"> 绑定 </el-button>
        <el-button size="small"> 修改 </el-button>
        <el-button size="small" color="#FF5722" class="btn-white"> 删除 </el-button>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :size="size"
        layout="  prev, pager, next, total,jumper,sizes"
        :total="total"
      />
    </div>
    <Edit></Edit>
    <Binding></Binding>
  </div>
</template>
<script lang="ts" setup>
import timeData from "@/mock/timeData"
import dayjs from "dayjs"
import type { ComponentSize } from "element-plus"
import { ref, computed } from "vue"
import Edit from "./components/Edit/index.vue"
import Binding from "./components/Binding/index.vue"
const tableData = ref(timeData.data.list)
const transTime = computed(() => {
  return function (data: number) {
    return dayjs(data).format("YYYY-MM-DD HH:mm:ss")
  }
})
const total = ref(timeData.data.count)
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref<ComponentSize>("default")
</script>
<style lang="scss" scoped>
.btn-white {
  color: #ffffff;
}
.demo-pagination-block {
  margin-top: 20px;
  float: right;
}
</style>
