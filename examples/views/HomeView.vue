<template>
  <div class="home">
    <hl-area />
  </div>
</template>

<script>
import HlArea from '@packages/area/area.vue'

export default {
  name: 'HomeView',
  components: {
    HlArea
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
