<template>
  <div class="edit-dialog">
    <el-dialog v-model="dialogVisible" title="测试流量" width="500" top="10vh">
      <template #footer>
        <div class="dialog-footer">
          <el-button>取消</el-button>
          <el-button color="#009688"> 保存 </el-button>
        </div>
      </template>
      <el-form :model="form" label-width="auto" class="form-dialog">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请输入项目名称" size="large" />
        </el-form-item>
        <el-form-item label="定时器名称">
          <el-input v-model="form.name" placeholder="请输入定时器名称" size="large" />
        </el-form-item>
        <el-form-item label="是否开启">
          <el-radio-group v-model="form.name">
            <el-radio value="1" size="large">是</el-radio>
            <el-radio value="2" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="超时间隔(分钟)">
          <el-input v-model="form.name" placeholder="请输入超时间隔 " size="large" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.name" placeholder="请输入备注" size="large" />
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
.edit-dialog {
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
        width: 80%;
        margin: auto;
      }
    }
  }
  .form-dialog {
    padding: 30px 90px 0 50px;
    :deep(.el-form-item__label) {
      margin: auto !important;
      font-weight: 500;
    }
  }
}
</style>
