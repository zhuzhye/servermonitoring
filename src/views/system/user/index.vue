<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    :tree-props="{ children: 'children' }"
    :default-sort="{ prop: 'sort', order: '' }"
    default-expand-all
    border
  >
    <el-table-column prop="sort" label="序号" show-overflow-tooltip sortable />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="updateTime" label="更新时间" />
    <el-table-column prop="nickName" label="用户名" />
    <el-table-column prop="phone" label="手机号" />
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="state" label="状态" />
    <el-table-column prop="action" label="操作" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const tableData = ref()
</script>
<style lang="scss" scoped></style>
