<template>
  <div class="addserver-dialog">
    <el-dialog v-model="dialogVisible" title="历史记录" width="90%" top="10vh">
      <template #footer>
        <div class="dialog-footer">
          <el-button color="#009688"> 关闭 </el-button>
        </div>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
        :default-sort="{ prop: 'sort', order: '' }"
        default-expand-all
        border
      >
        <el-table-column prop="projectName" label="" />
        <el-table-column prop="projectName" label="服务地址" />
      </el-table>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const tableData = ref([])
const dialogVisible = ref(false)
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
}
</style>
