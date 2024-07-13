<template>
  <div class="login-body">
    <div class="login-header">
      <img src="../../assets/logo.png" alt="" />
      服务监控平台
    </div>
    <Motion :delay="150">
      <div class="QRdingding">
        <div class="dingText">
          <img class="ytxImg" src="../../assets/ytx.png" alt="" />
          <span>使用钉钉扫码</span>
        </div>
        <div v-loading="imageSpinning">
          <div id="login_container"></div>
        </div>
      </div>
    </Motion>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { getDDImage,  } from "./hooks"
import Motion from "./utils/motion"

const appid = ref("dingnxsxidanep0b3uwx")
const ddurl = ref(window.location.origin + "/#/login")
let imageSpinning = ref(false)
onMounted(async () => {
  let { spinning } = getDDImage(ddurl, appid)
  imageSpinning.value = spinning.value
})
</script>
<style scoped lang="scss">
.login-body {
  background-image: url("../../assets/bg_login.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.login-header {
  font-size: 20px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.85) !important;
  padding: 10px;
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
  }
}
#login_container {
  display: flex;
  :deep(iframe) {
    margin: auto;
  }
}
.login-header img {
  width: 40px;
}
.QRdingding {
  width: 400px;
  height: 480px;
  margin: 0 auto;
  margin-top: 150px;
  padding: 20px;
  text-align: center;
  background: linear-gradient(139deg, #fff, #fff);
  box-shadow: 0 1px 10px 0 #aaabad;
  border-radius: 4px;
}
.dingText {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dingText .ytxImg {
  width: 40px;
  height: 46px;
}
.dingText span {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #171a1d;
}
</style>
