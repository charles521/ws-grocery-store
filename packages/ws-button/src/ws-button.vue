<template>
  <div class="ws-button">
    <br>
    <br>
    <br>
    这是通过npm安装的按钮
    <br>
    <br>
    <van-button class="wbtn" type="primary" @click="btnClick">ws-button</van-button>
  </div>
</template>
<script>
import { Button } from 'vant'

export default {
  name: 'WsButton',
  components: {
    [Button.name]: Button
  },
  data() {
    return {

    }
  },
  methods: {
    btnClick() {
      this.$emit('wsClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.ws-button {
  ::v-deep.wbtn {
    color: bisque;
    font-weight: bold;
  }
}
</style>
