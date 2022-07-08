<template>
  <div class="home">
    12132
    <ws-button />
    <br>
    <br>
    <br>
    <ws-card />
  </div>
</template>

<script>
import WsButton from '@packages/button/button.vue'
import WsCard from '@packages/card/card.vue'

export default {
  name: 'HomeView',
  components: {
    WsButton,
    WsCard
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
