<template>
  <div class="addserver-dialog">
    <el-dialog
      v-model="testFlowModal"
      title="测试流量"
      width="100%"
      top="5vh"
      draggable
      @close="closeMoal"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button color="#009688" @click="closeMoal"> 关闭 </el-button>
        </div>
      </template>
      <div class="search-box">
        <el-input v-model="numberStr" class="search-input" placeholder="流量条数" size="large" />
        <el-button type="primary" size="large" :icon="Search" @click="searchData">查询</el-button>
      </div>
      <el-table :data="tableData" border table-layout="auto" style="width: 100%">
        <el-table-column prop="b" label="">
          <template #default="scope">
            {{ transB(scope.row.b) }}
          </template>
        </el-table-column>
        <el-table-column prop="a" label="时间" />
        <el-table-column prop="c" label="网卡" />
        <el-table-column prop="d" label="接收的数据包" />
        <el-table-column prop="e" label="发送的数据包" />
        <el-table-column prop="f" label="接收的字节数" />
        <el-table-column prop="g" label="发送的字节数" />
        <el-table-column prop="h" label="接收的压缩数据包" />
        <el-table-column prop="i" label="发送的压缩数据包" />
        <el-table-column prop="j" label="接收的多播数据包" />
      </el-table>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import tsServicesStore from "@/stores/monitor/tsServices"
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import type { ITestFlow } from "./type"
import { Search } from "@element-plus/icons-vue"
const initData: ITestFlow[] = []
let tableData = ref<ITestFlow[]>(initData)
const useTsServicesStore = tsServicesStore()
const { testFlowModal } = storeToRefs(useTsServicesStore)
const emits = defineEmits(["testFlow"])
let id = ref<string>("")
let numberStr = ref<string>("")
/**
 * @description 设置表格里的值
 */
const setTableData = (dataList: ITestFlow[], rowId: string) => {
  id.value = rowId
  tableData.value = []
  tableData.value = Object.assign(tableData.value, dataList)
}

/**
 * @description 关闭弹框
 */
const closeMoal = () => {
  testFlowModal.value = false
  id.value = ""
  tableData.value = []
}

/**
 * @descrpition: 查询表格的值
 */
const searchData = () => {
  let number = Number(numberStr.value)
  if (number && number > 0) {
    emits("testFlow", id.value, number)
  } else {
    emits("testFlow", id.value)
  }
}
const transB = computed(() => {
  return function (data: string) {
    return data === "PM" ? "下午" : "上午"
  }
})
defineExpose({
  setTableData
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
      .search-box {
        margin-bottom: 20px;
        .search-input {
          width: 200px;
          margin-right: 10px;
        }
      }
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
