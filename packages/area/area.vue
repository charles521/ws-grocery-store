<template>
  <div class="hl-area">
    <div class="hl-area-header">
      <slot name="header" />
    </div>
    <div class="selectd-column">
      <div class="scroll-bar">
        <div
          v-for="(item,index) in selectedAddress"
          :key="index"
          class="item"
          :style="{color: index === selectedIndex ? color: ''}"
          @click="onSelectedHandle(index)"
        >{{ countName(item.name) }}</div>
      </div>
    </div>

    <ul class="address-list">
      <li
        v-for="(item, index) in addressList"
        :key="index"
        :style="{color: index === listIndex ? color: ''}"
        @click="choiceAddress(item,index)"
      >
        <span class="txt">{{ item.name }}</span>
        <van-icon v-show="index === listIndex" class="icon" name="success" />
      </li>
    </ul>
  </div>
</template>
<script>
import AddressJson from './address.json'
import { Icon } from 'vant'
export default {
  name: 'HlAreaCom',
  components: {
    [Icon.name]: Icon
  },
  props: {
    color: {
      type: String,
      default: '#ff0000'
    }
  },
  data() {
    return {
      selectedAddress: [{ name: '请选择', adcode: 0 }], // 顶部已选数据
      selectedIndex: 0, // 当前选择在第几级索引
      addressList: [], // 展示地址列表数据
      listIndex: null // 当前选择第几个地址
    }
  },
  computed: {
    countName() {
      return (name) => {
        if (name.length > 6) {
          name = name.slice(0, 6) + '...'
        }
        return name
      }
    }
  },
  created() {
    this.addressList = AddressJson.data
  },
  methods: {
    // 顶部已选择点击
    onSelectedHandle(index) {
      const { selectedIndex } = this
      if (selectedIndex === index) return
      const arr = JSON.parse(JSON.stringify(this.selectedAddress))
      this.selectedAddress = arr.slice(0, index)

      this.listIndex = null
      if (this.selectedAddress.length === 0) {
        // 为第一个时重置
        this.selectedIndex = 0
        this.selectedAddress = [{ name: '请选择', adcode: 0 }]
        this.addressList = AddressJson.data
      } else {
        this.selectedIndex = index
        this.selectedAddress.push({ name: '请选择' })
        this.addressList = this.selectedAddress[index - 1].child
      }
    },
    // 选择城市
    choiceAddress(item, index) {
      this.listIndex = index
      this.selectedAddress[this.selectedIndex] = item
      this.$nextTick(() => {
        if (!item.child) {
          // 最后一级时
          this.$emit('selected', this.selectedAddress)
          return
        }
        ++this.selectedIndex
        this.selectedAddress.push({ name: '请选择' })
        this.addressList = item.child
        this.listIndex = null
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.hl-area {
  * {
    box-sizing: border-box;
  }
  padding-top: 5px;
  color: #333;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .hl-area-header {
    width: 100%;
    padding: 10px 50px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    flex-shrink: 0;
  }
  .selectd-column {
    width: 100%;
    overflow-x: auto;
    padding: 10px 0 20px 20px;
    flex-shrink: 0;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .scroll-bar {
      display: flex;
      flex-wrap: nowrap;
      .item {
        flex-shrink: 0;
        font-size: 16px;
        font-weight: bold;
        padding-right: 20px;
        &.active {
          color: #ff0000;
        }
      }
    }
  }
  .address-list {
    flex: 1;
    overflow-y: auto;
    li {
      font-size: 14px;
      padding: 12px 20px;
      border-bottom: 1px solid #f3f3f3;
      display: flex;
      line-height: 15px;
      align-items: center;
      &.active {
        color: #ff0000;
      }
      .icon {
        font-size: 15px;
        margin-left: auto;
      }
    }
  }
}
</style>
