<template>
<div>
  <!-- 导航 -->
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
  <!--商品列表 -->
  <cart-list></cart-list>
  <!-- 汇总列表 -->
  <cart-botton-bar></cart-botton-bar>
</div>

</template>

<script>
import NavBar from '.././../components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'
import CartBottonBar from './childComps/CartBottonBar.vue'

import { mapGetters } from 'vuex'



export default {
 name:"Cart",
 components: {  
  NavBar,
  CartList,
  CartBottonBar
 },
 computed:{
  // ...mapGetters(['carLength','carList']) 第一种方法
  ...mapGetters({
    length:'carLength',
 
  })
 }
}
</script>

<style>
.nav-bar{

  background-color: var(--color-tint);
  color: #fff;

}
</style>