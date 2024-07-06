<template>
  <div class="addserver-dialog">
    <el-dialog v-model="dialogVisible" title="测试流量" width="500" top="10vh">
      <template #footer>
        <div class="dialog-footer">
          <el-button>取消</el-button>
          <el-button color="#009688"> 保存 </el-button>
        </div>
      </template>
      <el-form :model="form" label-width="auto" class="form-dialog">
        <el-form-item label="CPU(%)">
          <el-input v-model="form.name" placeholder="请输入CPU占用比" size="large" />
        </el-form-item>
        <el-form-item label="硬盘(G)">
          <el-select v-model="form.region" placeholder="请输入硬盘大小" size="large">
            <el-option label="server" value="server" />
            <el-option label="web" value="web" />
          </el-select>
        </el-form-item>
        <el-form-item label="内存(N)">
          <el-input v-model="form.name" placeholder="请输入占用内存" size="large" />
        </el-form-item>
        <el-form-item label="分盘(%)">
          <el-input v-model="form.name" placeholder="请输入分盘大小" size="large" />
        </el-form-item>
        <el-form-item label="存活率(%)">
          <el-input v-model="form.name" placeholder="请输入存活率" size="large" />
        </el-form-item>
        <el-form-item label="日志(G)">
          <el-input v-model="form.name" placeholder="请输入日志大小" size="large" />
        </el-form-item>
        <el-form-item label="异常扣费(分次数)">
          <el-input v-model="form.name" placeholder="请输入异常扣费次数" size="large" />
        </el-form-item>
        <el-form-item label="连接个数">
          <el-input v-model="form.name" placeholder="请输入连接个数" size="large" />
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
