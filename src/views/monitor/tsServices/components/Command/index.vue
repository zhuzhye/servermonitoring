<template>
  <div class="addserver-dialog">
    <el-dialog v-model="dialogVisible" title="命令列表" width="700" top="10vh">
      <template #footer>
        <div class="dialog-footer">
          <el-button>取消</el-button>
          <el-button color="#009688"> 保存 </el-button>
        </div>
      </template>
      <el-form :model="form" label-width="auto" class="form-dialog">
        <el-form-item label="开启">
          <el-input v-model="form.name" size="large" />
        </el-form-item>
        <el-form-item label="关闭">
          <el-input v-model="form.name" size="large" />
        </el-form-item>
        <el-form-item label="重启">
          <el-input v-model="form.name" size="large" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { reactive } from "vue"

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
})

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
