<template>
  <div class="home">
    <div class="btn-column">
      <van-button type="primary" @click="areaIsShow = true">选择地址</van-button>
      <van-button type="info" @click="mapIsShow = true">地图选址</van-button>
      <van-button type="warning" @click="signIsShow = !signIsShow">手写签名</van-button>
    </div>

    <!-- 地址选择弹框 -->
    <van-popup v-model="areaIsShow" closeable position="bottom" :style="{ height: '70%' }" round>
      <hl-area color="#1989fa" @selected="onSelecteAddressHandle">
        <template #header>
          <span>请选择地区</span>
        </template>
      </hl-area>
    </van-popup>
    <!-- 地图选址 -->
    <van-popup v-model="mapIsShow" closeable position="bottom" :style="{ height: '80%',paddingTop: '10px' }" round>
      <hl-map @change="mapChangeHandle" />
    </van-popup>
    <!-- 手写签名 -->
    <hl-sign v-if="signIsShow" :canvas-w="360" :canvas-h="400" @onCanvas="drawHandle" />
  </div>
</template>
<script>
import { Popup, Button } from 'vant'

export default {
  name: 'HomeView',
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data() {
    return {
      areaIsShow: false,
      mapIsShow: false,
      signIsShow: false
    }
  },
  methods: {
    // 选择地址回调
    onSelecteAddressHandle(arr) {
      this.areaIsShow = false
      console.log(arr, 'arr')
    },
    // 地图选址回调
    mapChangeHandle(address) {
      this.mapIsShow = false
      console.log(address)
    },
    // 手写签名绘制回调
    drawHandle(img) {
      console.log(img)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  ::v-deep .btn-column {
    .van-button {
      width: 80%;
      margin-top: 15px;
    }
  }
}
</style>
