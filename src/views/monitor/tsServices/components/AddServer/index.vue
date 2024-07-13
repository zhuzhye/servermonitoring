<template>
  <div class="addserver-dialog">
    <el-dialog
      v-model="addServerModal"
      :title="modalTitle.value"
      width="700"
      top="10vh"
      draggable
      @close="closeModal"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeModal">取消</el-button>
          <el-button color="#009688" @click="saveForm"> 保存 </el-button>
        </div>
      </template>
      <el-form :model="form" label-width="auto" class="form-dialog" :rules="rules" ref="formRef">
        <el-form-item label="服务名" prop="name">
          <el-input v-model="form.name" placeholder="请输入服务名" size="large" />
        </el-form-item>
        <el-form-item label="服务类型" prop="serviceType">
          <el-select
            v-model="form.serviceType"
            placeholder="--请输入服务类型--"
            size="large"
            style="width: 200px"
          >
            <el-option
              v-for="item in serverSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="jar路径" v-if="form.serviceType === 'web'" prop="scriptPath">
          <el-input v-model="form.scriptPath" placeholder="请输入路径" size="large" />
        </el-form-item>
        <el-form-item label="内存溢出路径" v-if="form.serviceType === 'web'" prop="oomPath">
          <el-input v-model="form.oomPath" placeholder="请输入内存溢出路径" size="large" />
        </el-form-item>
        <el-form-item label="名称" v-if="form.serviceType === 'mysql'" prop="databaseName">
          <el-input v-model="form.databaseName" placeholder="请输入数据库名称" size="large" />
        </el-form-item>
        <el-form-item label="地址及端口" prop="serverAddress">
          <el-input v-model="form.serverAddress" placeholder="形如188.188.1.1:22" size="large" />
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" size="large" />
        </el-form-item>
        <el-form-item label="密码" prop="passward">
          <el-input
            v-model="form.passward"
            placeholder="请输入密码"
            size="large"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="日志路径" v-if="form.serviceType === 'web'" prop="logsLocation">
          <el-input
            v-model="form.logsLocation"
            placeholder="形如 /usr/local/application/xxx/logs"
            size="large"
          />
        </el-form-item>
        <el-form-item label="心跳存取路径" v-if="form.serviceType === 'web'" prop="heartPath">
          <el-input
            v-model="form.heartPath"
            placeholder="形如 /usr/local/application/xxx/logs/xxx.log"
            size="large"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="telePhone">
          <el-input v-model="form.telePhone" placeholder="请输入联系电话" size="large" />
        </el-form-item>
        <el-form-item label="服务备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入服务备注" size="large" />
        </el-form-item>
        <el-form-item label="自定义命令" v-if="form.serviceType === '其他类型'" prop="cusCommand">
          <el-input v-model="form.cusCommand" placeholder="请输入自定义命令" size="large" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import tsServicesStore from "@/stores/monitor/tsServices"
import { storeToRefs } from "pinia"
import { reactive, type PropType, ref, computed, type ComputedRef } from "vue"
import { getTitle, serverType } from "./hooks"
import { IAddType, type IAddServer, type IselectList } from "./type"
import type { tableDataType } from "../../types"
import { addServer } from "@/api/monitor/tsServices"
import type { FormInstance, FormRules } from "element-plus"
let { addServerModal } = storeToRefs(tsServicesStore())
const formRef = ref<FormInstance>()
const props = defineProps({
  currentRow: {
    type: Object as PropType<tableDataType>,
    delfalut: () => {}
  },
  addType: {
    type: Number as PropType<IAddType>,
    default: 0
  }
})
let modalTitle = computed<ComputedRef<string>>(() => getTitle(props.addType))
let serverSelectList = computed<IselectList[]>(() => serverType(props.addType))

const emits = defineEmits(["getTableData"])
const rules = reactive<FormRules<IAddServer>>({
  name: [{ required: true, message: "该选项必填", trigger: "blur" }],
  serverAddress: [{ required: true, message: "该选项必填", trigger: "blur" }],
  databaseName: [{ required: true, message: "数据库名称不能为空", trigger: "blur" }],
  scriptPath: [{ required: true, message: "jar包路径不能为空", trigger: "blur" }],
  username: [{ required: true, message: "该选项必填", trigger: "blur" }],
  passward: [{ required: true, message: "该选项必填", trigger: "blur" }]
})
let form = reactive<IAddServer>({
  id: "",
  name: "",
  serviceType: "",
  scriptPath: "",
  oomPath: "",
  databaseName: "",
  serverAddress: "",
  username: "",
  passward: "",
  logsLocation: "",
  telePhone: "",
  heartPath: "",
  remark: "",
  cusCommand: "",
  pid: ""
})
/**
 * @description 保存表单
 */
const saveForm = async () => {
  if (props.currentRow) {
    if (props.addType === IAddType.AddLow) {
      form.pid = props.currentRow.id
    } else if (props.addType === IAddType.EditLow) {
      form.pid = props.currentRow.pid
      form.id = props.currentRow.id
      form._method = "PUT"
    } else if (props.addType === IAddType.Edit) {
      form._method = "PUT"

      form.id = props.currentRow.id
    }
  }
  if (formRef.value) {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const result = await addServer(form)
        if (result.code === 200) {
          emits("getTableData")
          closeModal()
        }
      }
    })
  }
}
/**
 * @description 回显数据
 */
const setFormData = (result: IAddServer) => {
  for (let key in form) {
    form[key] = result[key]
  }
}
/**
 * @description 关闭弹框
 */
const closeModal = () => {
  console.log(serverSelectList, "serverSelectList")
  if (formRef.value) {
    formRef.value.resetFields()
    addServerModal.value = false
  }
}
defineExpose({ setFormData })
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
