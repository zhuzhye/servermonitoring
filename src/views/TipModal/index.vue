<template>
  <div class="tip-dialog">
    <el-dialog
      v-model="props.showModal"
      :title="props.title"
      :width="props.width"
      :top="props.top"
      draggable
      @close="cancel"
    >
      <slot name="default">
        <span class="tip-class">{{ props.context }}</span>
      </slot>
      <slot name="footer">
        <slot name="footer-btn">
          <div class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button color="#009688" @click="sure" :loading="props.loading"> 确认 </el-button>
          </div>
        </slot>
      </slot>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue"

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: ""
  },
  top: {
    type: String as PropType<string>,
    default: "35vh"
  },
  width: {
    type: String as PropType<string>,
    default: "260"
  },
  context: {
    type: String as PropType<string>,
    default: ""
  },
  showModal: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  type: {
    type: Number as PropType<Number>,
    default: null
  },
  attrs: {
    type: Object as PropType<Record<string, any>>,
    default: {}
  },
  loading: {
    type: Boolean as PropType<Boolean>,
    default: false
  }
})
const emits = defineEmits(["cancelModal", "sureModal"])
/**
 * @description: 取消弹框
 */
const cancel = () => {
  emits("cancelModal")
}
/**
 * @description: 确认弹框
 */
const sure = () => {
  emits("sureModal", props.type, props.attrs)
}
</script>
<style lang="scss" scoped>
.tip-dialog {
  :deep(.el-dialog) {
    padding: 0;
    overflow: auto;
    .el-dialog__header {
      background: #191b21;
      display: flex;
      .el-dialog__title {
        color: var(--menu-color);
        font-size: 14px;
        padding: 13px 0 0 20px;
      }
      .el-dialog__headerbtn {
        font-size: 25px;
        padding: 10px;
      }
    }

    .dialog-footer {
      padding-right: 10px;
      padding-bottom: 10px;
    }
    .el-dialog__body {
      display: flex;
      width: 100%;
      .tip-class {
        display: block;
        height: 30px;
        padding: 20px;
        color: #000000c4;
        font-size: 16px;
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
