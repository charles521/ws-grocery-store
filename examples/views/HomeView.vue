<template>
  <div class="home">
    <!-- 地址选择弹框 -->
    <van-popup v-model="areaIsShow" closeable position="bottom" :style="{ height: '70%' }" round>
      <hl-area color="#1989fa" @selected="onSelecteAddressHandle">
        <template #header>
          <span>请选择地区</span>
        </template>
      </hl-area>
    </van-popup>
    <van-popup v-model="mapIsShow" closeable position="bottom" :style="{ height: '80%',paddingTop: '10px' }" round>
      <hl-map />
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant'

export default {
  name: 'HomeView',
  components: {
    [Popup.name]: Popup
  },
  data() {
    return {
      mapIsShow: true,
      areaIsShow: false
    }
  },
  methods: {
    onSelecteAddressHandle() {

    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
