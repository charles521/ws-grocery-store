<template>
  <div class="hl-map">
    <div class="fixed-header">
      <!-- 搜索框 -->
      <div class="search-box">
        <van-search
          v-model="search_key"
          show-action
          placeholder="请输入搜索关键词"
          :clearable="false"
          @input="searchBtnHandle('input')"
          @search="searchBtnHandle"
          @cancel="clearSearchHandle"
        />
      </div>
      <!-- 地图 -->
      <div class="map-box">
        <div id="map_container" class="map" />
        <div class="sign" />
      </div>
    </div>
    <!-- 地图内容 -->
    <div ref="scorllColumn" class="map-column">
      <!-- 地址列表 -->
      <div class="address-list">
        <ul>
          <li
            v-for="(item, index) in addressList"
            :key="index"
            class="address-item"
            @click="onAddressClickHandle(item)"
          >
            <van-icon class="icon" name="location-o" />
            <p class="name">{{ item.name }}</p>
            <p class="address">{{ item.address }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div v-if="!!search_key" class="search-popup">
      <ul class="search-list">
        <li
          v-for="(item,index) in searchList"
          :key="index"
          class="search-item"
          @click="onSearchItemClickHandle(item.location)"
        >
          <p class="name">{{ item.name }}</p>
          <p class="address">{{ item.address }}</p>
        </li>
        <li v-if="noSearch" class="no-search">暂无搜索结果</li>
      </ul>
    </div>
    <van-loading v-if="mapLoading" class="map-loading" size="42px" vertical>地图加载中...</van-loading>
  </div>
</template>
<script>
import axios from 'axios'
import { Icon, Search, Loading } from 'vant'

export default {
  name: 'HlMap',
  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Search.name]: Search
  },
  data() {
    return {
      mapLoading: true,
      center: [121.475190, 31.228833], // 经度+纬度
      search_key: '', // 搜索值
      addressList: [], // 地址列表数据
      searchList: [], // 搜索结果
      noSearch: false,
      marker: '' // 标记点
    }
  },
  created() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://webapi.amap.com/maps?v=1.4.14&key=f2226da375179fd2e56ed46a6d20e72e'
    document.body.appendChild(script)
    window._AMapSecurityConfig = {
      serviceHost: 'https://amap.helixinxuan.com/_AMapService'
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initMapHandle('first_init')
      }, 1000)
    })
  },
  methods: {
    // 初始化地图
    initMapHandle(type) {
      // eslint-disable-next-line no-undef
      const map = new AMap.Map('map_container', {
        zoom: 14,
        center: this.center
      })
      // 获取初始中心点并赋值
      let currentCenter = map.getCenter()
      this.center = [currentCenter.lng, currentCenter.lat]
      // 创建标记
      // eslint-disable-next-line no-undef
      this.marker = new AMap.Marker({
        // eslint-disable-next-line no-undef
        position: new AMap.LngLat(currentCenter.lng, currentCenter.lat)
      })
      // 将创建的点标记添加到已有的地图实例：
      map.add(this.marker)
      this.mapLoading = false
      // 根据地图中心点查附近地点
      this.searchPlaceHandle()
      if (type === 'first_init') {
        // 首次进入 获取用户当前位置
        this.getUserCurAddressHandle(map)
      }
      // 监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      const moveendFun = (e) => {
        // 获取地图中心点
        currentCenter = map.getCenter()
        this.center = [currentCenter.lng, currentCenter.lat]
        this.marker.setPosition([currentCenter.lng, currentCenter.lat]) // 更新标记的位置
      }
      // 更新数据
      const centerSearch = () => {
        this.searchPlaceHandle()
      }
      // 绑定事件移动地图事件
      map.on('mapmove', moveendFun) // 更新标记
      map.on('moveend', centerSearch) // 更新数据
    },
    // 根据参数查附近地点
    searchPlaceHandle() {
      // eslint-disable-next-line no-undef
      AMap.service(['AMap.PlaceSearch'], () => {
        // 构造地点查询类
        // eslint-disable-next-line no-undef
        const placeSearch = new AMap.PlaceSearch({
          type: '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息', // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: '全国', // 兴趣点城市
          citylimit: false, // 是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        // 根据地图中心点查附近地点
        placeSearch.searchNearBy('', [this.center[0], this.center[1]], 200, (status, result) => {
          console.log(status, result)
          if (status === 'complete') {
            // 将查询到的地点赋值
            this.addressList = result.poiList.pois
          }
        })
      })
    },
    // 获取用户当前位置
    getUserCurAddressHandle(map) {
      // eslint-disable-next-line no-undef
      AMap.service(['AMap.Geolocation'], () => {
        // eslint-disable-next-line no-undef
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', // 定位按钮的停靠位置
          // eslint-disable-next-line no-undef
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
        })
        map.addControl(geolocation)

        geolocation.getCurrentPosition((status, result) => {
          console.log(status, result, 'status,result')
        })
      })
    },
    // 搜索
    searchBtnHandle(type) {
      if (type === 'input' && this.search_key.length < 2) return
      // eslint-disable-next-line no-undef
      AMap.service(['AMap.PlaceSearch'], () => {
        // 构造地点查询类
        // eslint-disable-next-line no-undef
        const placeSearch = new AMap.PlaceSearch({
          type:
            '汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息', // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: '全国', // 兴趣点城市
          citylimit: false, // 是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        // 关键字查询
        placeSearch.search(this.search_key, (status, result) => {
          if (status === 'complete') {
            if (result.poiList.count === 0) {
              this.noSearch = true
            } else {
              this.searchList = result.poiList.pois // 将查询到的地点赋值
              this.noSearch = false
            }
          } else {
            this.searchList = []
            this.noSearch = true
          }
        })
      })
    },
    // 清理搜索框
    clearSearchHandle() {
      this.search_key = ''
    },
    // 地址列表点击
    onAddressClickHandle(e) {
      this.marker.setPosition([e.location.lng, e.location.lat]) // 更新标记的位置
      // 获取省市区
      this.getAddressHandle(e)
    },
    // 搜索结果li 点击
    onSearchItemClickHandle(location) {
      this.center = [location.lng, location.lat]
      this.search_key = ''
      setTimeout(() => {
        this.$refs.scorllColumn.scrollTop = 0
        this.initMapHandle()
      }, 1000)
    },
    // 调用接口获取省市区
    getAddressHandle(e) {
      const url = `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${e.location.lng},${e.location.lat}&key=5736bb3c16a07524cb2fcbe395d3acc9&radius=1000`
      axios.get(url).then(res => {
        if (res.data.info === 'OK') {
          const { province, city, district, township: street } = res.data.regeocode.addressComponent
          const address = e.name
          const obj = {
            province,
            city: city.length === 0 ? province : city,
            district,
            street,
            address
          }
          this.$emit('change', obj)
        }
      })
    },
    // 防抖
    debounce(func, wait, immediate) {
      let timer
      return function() {
        const context = this
        const args = arguments

        if (timer) clearTimeout(timer)
        if (immediate) {
          const callNow = !timer
          timer = setTimeout(() => {
            timer = null
          }, wait)
          if (callNow) func.apply(context, args)
        } else {
          timer = setTimeout(() => {
            func.apply(context, args)
          }, wait)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hl-map {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background-color: #fff;
  text-align: left;
  color: #333;
  display: flex;
  flex-direction: column;
  position: relative;
  .map-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9;
  }
  .fixed-header {
    width: 100%;
    background-color: #fff;
    z-index: 2;
    .header-txt {
      text-align: center;
      font-size: 16px;
      padding: 15px 10px 5px;
      font-weight: bold;
    }
    .search-box {
      width: 100%;
    }
    .map-box {
      padding: 0 12px;
      .map {
        height: 200px;
        border-radius: 5px;
      }
    }
  }
  .map-column {
    flex: 1;
    overflow-y: auto;
    .address-list {
      padding: 10px 15px;
      .address-item {
        padding: 5px 0 5px 25px;
        font-size: 14px;
        line-height: 1.4;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        .icon {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
        }
        .address {
          color: #999;
        }
      }
    }
  }
  .search-popup {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: calc(100% - 50px);
    background-color: #fff;
    overflow-y: auto;
    z-index: 11;
    .search-list {
      padding: 10px 15px;
      .search-item,.no-search {
        padding: 5px 0;
        font-size: 14px;
        line-height: 1.4;
        border-bottom: 1px solid #eaeaea;
        .address {
          color: #999;
        }
      }
      .no-search {
        height: 50px;
        line-height: 40px;
      }
    }
  }
}
</style>
