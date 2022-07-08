<template>
  <div class="ws-card">
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
  </div>
</template>
<script>
import { Card } from 'vant'
export default {
  name: 'WsCard',
  components: {
    [Card.name]: Card
  }
}
</script>
<style lang="scss" scoped>
@import url('./card.scss');
</style>
