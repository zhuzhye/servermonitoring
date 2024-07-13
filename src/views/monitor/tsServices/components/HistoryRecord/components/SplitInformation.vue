<template>
  <div class="addserver-dialog">
    <el-dialog
      v-model="historySplitModal"
      title="分盘详情"
      width="100%"
      top="11vh"
      @close="closeModal"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button color="#009688" @click="closeModal"> 关闭 </el-button>
        </div>
      </template>

      <el-table
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
        :default-sort="{ prop: 'sort', order: '' }"
        default-expand-all
        border
        :data="tableData"
      >
        <el-table-column label="分盘大小" prop="fileSystem" />
        <el-table-column label="总容量" prop="total" />
        <el-table-column label="已使用容量" prop="used" />
      </el-table>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import tsServicesStore from "@/stores/monitor/tsServices"
import { storeToRefs } from "pinia"
import { ref } from "vue"
import type { IDisk } from "../types"
const useTsServicesStore = tsServicesStore()
const { historySplitModal } = storeToRefs(useTsServicesStore)
let tableData = ref<IDisk[]>()
const setTableData = (Disk: IDisk[]) => {
  tableData.value = Disk
}
/**
 * @description: 关闭弹窗
 */
const closeModal = () => {
  tableData.value = []
  historySplitModal.value = false
}
defineExpose({ setTableData })
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
