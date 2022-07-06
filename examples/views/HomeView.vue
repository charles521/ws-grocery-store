<template>
  <div class="home">
    <ws-button />
    <br>
    <br>
    <br>
    <ws-card />
  </div>
</template>

<script>
import { WsButton, WsCard } from '@packages/index'

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
