<template>
  <div class="addserver-dialog">
    <el-dialog
      @close="closeModal"
      v-model="modifyConditionModal"
      title="修改条件"
      width="500"
      top="10vh"
      draggable
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeModal">取消</el-button>
          <el-button color="#009688" @click="saveForm"> 保存 </el-button>
        </div>
      </template>
      <el-form :model="form" label-width="auto" class="form-dialog" ref="formRef" :rules="rules">
        <el-form-item label="CPU(%)" prop="cpu">
          <el-input v-model="form.cpu" placeholder="请输入CPU占用比" size="large" />
        </el-form-item>
        <el-form-item label="硬盘(G)" prop="hard">
          <el-input v-model="form.hard" placeholder="请输入硬盘不足值(G)" size="large" />
        </el-form-item>
        <el-form-item label="内存(N)" prop="memory">
          <el-input v-model="form.memory" placeholder="请输入内存不足值(M)" size="large" />
        </el-form-item>
        <el-form-item label="分盘(%)" prop="part">
          <el-input v-model="form.part" placeholder="请输入分盘超出值(%)" size="large" />
        </el-form-item>
        <el-form-item label="存活率(%)" prop="boxSurvival">
          <el-input v-model="form.boxSurvival" placeholder="请输入盒子存活率(%)" size="large" />
        </el-form-item>
        <el-form-item label="日志(G)" prop="logsSize">
          <el-input v-model="form.logsSize" placeholder="请输入日志超出值(G)" size="large" />
        </el-form-item>
        <el-form-item label="异常扣费(分次数)" prop="ipsFlow">
          <el-input v-model="form.ipsFlow" placeholder="请输入(分钟,次数)" size="large" />
        </el-form-item>
        <el-form-item label="连接个数" prop="connectNum">
          <el-input v-model="form.connectNum" placeholder="请输入超出连接数(个)" size="large" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import tsServicesStore from "@/stores/monitor/tsServices"
import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"
import type { IModifyCondition } from "./type"
import { updateServiceConnection } from "@/api/monitor/tsServices"
import type { FormInstance, FormRules } from "element-plus"
const useTsServicesStore = tsServicesStore()
const { modifyConditionModal } = storeToRefs(useTsServicesStore)
let formRef = ref<FormInstance>()
const form = reactive<IModifyCondition>({
  cpu: "",
  hard: "",
  memory: "",
  part: "",
  boxSurvival: "",
  logsSize: "",
  ipsFlow: "",
  connectNum: ""
})
const rules = reactive<FormRules<IModifyCondition>>({
  cpu: [{ required: true, message: "该选项必填", trigger: "blur" }],
  hard: [{ required: true, message: "该选项必填", trigger: "blur" }],
  memory: [{ required: true, message: "该选项必填", trigger: "blur" }],
  part: [{ required: true, message: "该选项必填", trigger: "blur" }],
  boxSurvival: [{ required: true, message: "该选项必填", trigger: "blur" }],
  logsSize: [{ required: true, message: "该选项必填", trigger: "blur" }],
  ipsFlow: [{ required: true, message: "该选项必填", trigger: "blur" }],
  connectNum: [{ required: true, message: "该选项必填", trigger: "blur" }]
})
/**
 * @description 保存表格
 */
const saveForm = async () => {
  if (formRef.value) {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await updateServiceConnection(form)
        modifyConditionModal.value = false
        if (formRef.value) {
          formRef.value.resetFields()
        }
      }
    })
  }
}
/**
 * @param {IModifyCondition} dataList  通过父组件传值
 * @description 通过父组件传值赋值表单
 */
const setFrom = (dataList: IModifyCondition, id: string) => {
  for (let key in dataList) {
    form[key] = dataList[key]
  }
  form.serviceId = id
}
/**
 * @description 关闭弹框
 */
const closeModal = () => {
  modifyConditionModal.value = false
  if (formRef.value) {
    formRef.value.resetFields()
  }
}
defineExpose({
  setFrom
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
