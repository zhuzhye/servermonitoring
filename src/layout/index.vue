<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-container class="el-container-content">
        <el-aside width="200px"> <Menu></Menu></el-aside>
        <el-main>
          <div>面包屑</div>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Menu from "./components/Slider/Menu.vue"
import NavBar from "./components/NavBar/NavBar.vue"
import Main from "./components/Main/Main.vue"
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .el-container {
    height: 100%;
    .el-container-content {
      overflow: auto;
      flex: 1;
      ::-webkit-scrollbar {
        display: none;
      }
    }

    .el-aside {
      background: var(--bg-color);
      width: 220px;
    }
    .el-header {
      padding: 0;
    }
  }
}
</style>
