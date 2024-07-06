<template>
  <el-menu
    active-text-color="var(--menu-color)"
    background-color="var(--bg-color)"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="var(--menu-color)"
    @open="handleOpen"
    @close="handleClose"
  >
    <SubMenu :menuList="menuDataList"></SubMenu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import SubMenu from "./SubMenu.vue"
import menuList from "@/mock/router"
import type { ListItem } from "./types"
let menuDataList = ref<ListItem>(menuList.data["98dc1438cdbb4ce99362732a9bfae618"].menuVoList)
console.log(menuDataList, "menuDataList")
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="scss" scoped>
.el-menu {
  border: 0;
  :deep(.el-sub-menu__title) {
    background-color: var(--bg-menu-title);
  }
  :deep(.el-menu-item).is-active {
    background-color: var(--menu-active-color);
  }
}
</style>
