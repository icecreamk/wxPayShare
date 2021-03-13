<template>
  <div class="index">
    <div class="nickname" v-if="userInfo" v-text="userInfo.nickname"></div>    
    <div class="btn-group">
      <button class="btn">pay</button>
      <button class="btn">share</button>
      <button class="btn">activity</button>
    </div>
  </div>
</template>
<script>
import API from './../api/index'
export default {
  name: 'index',
  data(){
    return {
      userInfo:''
    }
  },
  mounted(){
    alert(this.$cookie.get('openId'))
    if(this.$cookie.get('openId')){
      this.getUserInfo();
    }
  },
  methods:{
    getUserInfo(){
      alert('get')
      this.$http.get(API.getUserInfo).then((response)=>{
        let res = response.data;
        this.userInfo = res.data;
      });
    },
    recharge(){
      this.$router.push('/pay')
    },
    activity(){
      this.$router.push('/activity')
    },
  }
}
</script>
<style>
  .index {
    background: #ddd;
    height: 100vh;
  }
  .header {
    width: 100%;
    height: 6.24rem;
  }
  .btn-group {
    text-align: center;
    padding-top: 0.34rem;
  }
</style>
