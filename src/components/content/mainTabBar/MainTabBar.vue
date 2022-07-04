<template>
    <tab-bar >
      <tab-baritme path='home' actiiveColor="bule">
        <img slot="itme-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="itme-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="itme-text">首页</div>
      </tab-baritme>
      <tab-baritme path='category'>
           <img slot="itme-icon" src="~assets/img/tabbar/category.svg" alt="">
           <img slot="itme-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="itme-text">分类</div>
      </tab-baritme>
          <tab-baritme path='cart'>
           <img slot="itme-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
           <img slot="itme-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="itme-text">购物车</div>
      </tab-baritme>
          <tab-baritme path='profile'>
           <img slot="itme-icon" src="~assets/img/tabbar/profile.svg" alt="">
           <img slot="itme-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="itme-text">我的</div>
      </tab-baritme>
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabber/TabBar.vue'
import TabBaritme from '../../common/tabber/TabBaritme.vue'
export default {
name:"MainTabBar",
components:{
  TabBar,
  TabBaritme
}
}
</script>

<style>

</style>