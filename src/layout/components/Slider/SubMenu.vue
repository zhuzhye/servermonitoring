<template>
  <template v-for="(menu, index) of props.menuList">
    <el-sub-menu v-if="menu.subMenus && menu.subMenus.length > 0" :index="menu.name">
      <template #title> {{ menu.name }}</template>
      <SubMenu :menuList="menu.subMenus" />
    </el-sub-menu>
    <el-menu-item :index="menu.name" @click="toRouter(menu)" v-else>
      <template #title> {{ menu.name }}</template>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>
import { type PropType } from "vue"
import { useRouter } from "vue-router"
import type { ListItem } from "./types"
const props = defineProps({
  menuList: {
    type: Object as PropType<ListItem>,
    default: () => []
  }
})
const vueRouter = useRouter()
const toRouter = (menu) => {
  console.log(menu)
  const path = menu.url.replace("#", "")
  vueRouter.push(path)
}
</script>
