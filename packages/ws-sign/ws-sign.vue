<template>
  <div class="ws-sign">
    <canvas class="drawing-board" :style="{ width: `${canvasW}px`, height: `${canvasH}px` }" />
    <div class="btn-bar">
      <van-button
        class="btn"
        plain
        type="info"
        @click="drawHandle('png')"
      >生成png</van-button>
      <van-button
        class="btn"
        plain
        type="danger"
        @click="clearHandle"
      >清屏</van-button>
      <van-button
        class="btn"
        plain
        type="danger"
        @click="undoHandle"
      >撤销</van-button>
    </div>
    <van-popup v-model="imgPopupIsShow" class="reault-popup">
      <div class="reault-box">
        <img class="reault-img" :src="reaultImg">

        <van-button class="save-btn" type="info" @click="saveImgHandle">保存签名</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import SmoothSignature from 'smooth-signature'
import { Popup, Toast } from 'vant'
export default {
  name: 'WsSign',
  components: {
    [Popup.name]: Popup
  },
  props: {
    canvasW: {
      type: Number,
      default: 300
    },
    canvasH: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      imgPopupIsShow: false,
      signature: null,
      reaultImg: 'https://img01.yzcdn.cn/vant/cat.jpeg'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvasHandle()
    })
  },
  methods: {
    // 初始化画布
    initCanvasHandle() {
      const canvas = document.querySelector('canvas', {
        width: 1000,
        height: 600,
        scale: 2,
        minWidth: 4,
        maxWidth: 10,
        color: '#1890ff'
      })
      this.signature = new SmoothSignature(canvas)
    },
    // 绘制处理
    drawHandle(type) {
      const isEmpty = this.signature.isEmpty()
      if (isEmpty) {
        Toast('签名不能为空')
        return
      }
      this.reaultImg = this.signature.getPNG()
      this.$emit('onCanvas', this.reaultImg)
      this.imgPopupIsShow = true
    },
    // 清屏
    clearHandle() {
      this.signature.clear()
    },
    // 撤销
    undoHandle() {
      this.signature.undo()
    },
    // 保存图片
    saveImgHandle() {
      const saveLink = document.createElement('a')
      saveLink.href = this.reaultImg
      saveLink.download = new Date().getTime() + '.png'
      saveLink.click()
    }
  }
}
</script>
<style lang="scss" scoped>
.ws-sign {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .drawing-board {
    border: 2px solid #000;
    border-radius: 5px;
    margin: 0 auto;
  }
  .btn-bar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px ;
    .btn {
      width: 90px;
      height: 40px;
      font-size: 14px;
      margin: 0 10px;
      border-radius: 10px;
    }
  }

  .reault-popup {
    background-color: transparent;
    .reault-img {
      width: 100%;
      border-radius: 10px;
      background-color: #fff;
    }
    .save-btn {
      width: 300px;
      border-radius: 100px;
      margin-top: 40px;
    }
  }
}
</style>

