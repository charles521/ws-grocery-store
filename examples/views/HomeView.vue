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
  </div>
</template>

<script>
import { Popup } from 'vant'
import HlArea from '@packages/area/area.vue'

export default {
  name: 'HomeView',
  components: {
    HlArea,
    [Popup.name]: Popup
  },
  data() {
    return {
      areaIsShow: true
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
