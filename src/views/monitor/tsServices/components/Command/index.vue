<template>
  <div class="addserver-dialog">
    <el-dialog v-model="commandModal" title="命令列表" width="700" top="10vh" draggable>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              () => {
                commandModal = false
                formRef?.resetFields()
              }
            "
            >取消</el-button
          >
          <el-button color="#009688" @click="verifyFormSubmit"> 保存 </el-button>
        </div>
      </template>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        label-width="auto"
        class="form-dialog"
      >
        <el-form-item label="开启" prop="offCommond">
          <el-input v-model="formData.offCommond" size="large" />
        </el-form-item>
        <el-form-item label="关闭" prop="rebootCommond">
          <el-input v-model="formData.rebootCommond" size="large" />
        </el-form-item>
        <el-form-item label="重启" prop="turnCommond">
          <el-input v-model="formData.turnCommond" size="large" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import loginStore from "@/stores/Login/login"
import tsServicesStore from "@/stores/monitor/tsServices"
import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"
import type { ICommand } from "./types"
import type { FormInstance } from "element-plus"
import type { FormRules } from "element-plus/lib"
import { arrangement, getCommond } from "@/api/monitor/tsServices"
//状态store
const useTsServicesStore = tsServicesStore()
const useLoginStore = loginStore()
const loginStoreList = storeToRefs(useLoginStore)
const { commandModal } = storeToRefs(useTsServicesStore)

//表单实例
const formRef = ref<FormInstance>()

//表单数据
let formData = reactive<ICommand>({
  id: "",
  offCommond: "",
  rebootCommond: "",
  turnCommond: ""
})

//规则校验
const rules = reactive<FormRules<ICommand>>({
  offCommond: [{ required: true, message: "该选项必填", trigger: "blur" }],
  rebootCommond: [{ required: true, message: "该选项必填", trigger: "blur" }],
  turnCommond: [{ required: true, message: "该选项必填", trigger: "blur" }]
})

/**
 * @description 校验保存
 */
const verifyFormSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      formData.user = loginStoreList.userInfo.value.username
      await arrangement<ICommand>(formData)
      if (formRef.value) {
        formRef.value.resetFields()
      }
      commandModal.value = false
    }
  })
}
/**
 * @param {string} id 列表id
 * @description 获取命令列表
 */
const getCommondInfo = async (id: string) => {
  formData.id = id
  const result = await getCommond<{ id: string }>({ id })
  if (result.data) {
    formData = Object.assign(formData, result.data)
  }
}
//导出方法
defineExpose({ getCommondInfo })
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
