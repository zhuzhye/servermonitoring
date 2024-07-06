<template>
  <div class="nav-bar">
    <div class="nav-bar-title">
      <img src="@/assets/logo.png" alt="" />
      <span>&nbsp; 英特讯 &nbsp;</span>
    </div>
    <div class="nav-bar-content">
      <div class="nav-bar-icon">
        <el-icon :size="24"> <i-ep-expand /></el-icon>
        <el-icon :size="24"><i-ep-refreshRight /></el-icon>
      </div>
      <div class="nav-bar-user">
        <el-dropdown>
          <span class="el-dropdown-link">
            用户名
            <el-icon class="el-icon--right">
              <i-ep-arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const activeName = ref("first")
</script>
<style lang="scss" scoped>
.nav-bar {
  height: 100%;
  display: flex;
  height: 60px;
  .nav-bar-title {
    display: flex;
    align-items: center;
    width: 220px;
    background: var(--bg-nav-title);
    padding-left: 50px;
    img {
      width: 35px;
    }
    span {
      font-size: 18px;
      font-weight: bold;
      color: #f2f2f2;
    }
  }
  .nav-bar-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .nav-bar-icon {
      .el-icon:first-child {
        margin-right: 10px;
      }
    }
    .nav-bar-user {
    }
  }
}
</style>
