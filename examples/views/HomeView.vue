<template>
  <div class="home">
    12132
    <ws-button />
    <br>
    <br>
    <br>
    <ws-card />

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
