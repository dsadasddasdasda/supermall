<template>
  <div id="app">
   <main-tab-bar></main-tab-bar>
   <keep-alive exclude="Detail">
     <!-- keep-alive不让home销毁 是因为路由销毁 让跳转页面回到原来的位置 -->
  <router-view></router-view>
   </keep-alive>

   
  </div>
  
</template>

<script>
import MainTabBar from './components/content/mainTabBar/MainTabBar.vue'
export default {    
  name: 'App',
  components: {
    MainTabBar
  },

}
</script>

<style>
@import 'assets/css/base.css';


</style>
