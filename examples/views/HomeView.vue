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
    <hl-map />
  </div>
</template>

<script>
import { Popup } from 'vant'
import HlArea from '@packages/area/area.vue'
import HlMap from '@packages/map/map.vue'

export default {
  name: 'HomeView',
  components: {
    HlArea,
    HlMap,
    [Popup.name]: Popup
  },
  data() {
    return {
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
