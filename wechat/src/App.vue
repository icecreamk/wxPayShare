<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import API from './api/index'
import wx from 'weixin-js-sdk'
import util from './util/index

export default {
  name: "app",
  mounted() {
    this.checkUserAuth()
    // 初始化
    // const appID = ''
    // const appsecret = ''
    // const redirect_uri = 'http://m.kkk.com'
    // const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
    // window.location = decodeURIComponent(url)
  },
  methods: {
    checkUserAuth: function () {
      const openId = this.$cookie.get('openId')
      console.log(openId)
      if (openId) {
        window.location.href = API.wechatRedireact
      } else {
        this.getWechatConfig()
      }
    },
    // 获取微信配置信息
    getWechatConfig: function() {
      console.log(`${API.wechatConfig}?url=${location.href.split('#')[0]}`)
      this.$http.get(`${API.wechatConfig}?url=${location.href.split('#')[0]}`).then(function (response) {
        console.log(res)
        const res = response.data
        if (res.code === 0) {
          const data = res.data
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp , // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: [] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            util.initShareInfo()
          })
        }
      }, function(err) {
        console.log(err)
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 2rem;
}
</style>
