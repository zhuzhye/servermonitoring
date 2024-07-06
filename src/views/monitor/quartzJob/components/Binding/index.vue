<template>
  <div class="binding-dialog">
    <el-dialog v-model="dialogVisible" title="微信公众号用户" width="800" top="10vh">
      <template #footer>
        <div class="dialog-footer">
          <el-button>取消</el-button>
          <el-button color="#009688"> 保存 </el-button>
        </div>
      </template>
      <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请选择用户"
        :data="data"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

interface Option {
  key: number
  label: string
  initial: string
}

const generateData = () => {
  const data: Option[] = []
  const states = [
    "California",
    "Illinois",
    "Maryland",
    "Texas",
    "Florida",
    "Colorado",
    "Connecticut "
  ]
  const initials = ["CA", "IL", "MD", "TX", "FL", "CO", "CT"]
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index]
    })
  })
  return data
}

const data = ref<Option[]>(generateData())
const value = ref([])

const filterMethod = (query, item) => {
  return item.initial.toLowerCase().includes(query.toLowerCase())
}
const dialogVisible = ref(false)
</script>
<style lang="scss" scoped>
.binding-dialog {
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
}
</style>
