<template>
<div class="cart-list" >
     <scroll class="content" ref="scroll">
      <cart-listitem v-for="(item,index) in carList" :key="index" :product=item></cart-listitem>
           </scroll>
  </div>


</template>

<script>
import scroll from '../../../components/common/scroll/Scroll.vue'
import CartListitem from './CartListitem.vue'
import {mapGetters} from 'vuex'

export default {
namme:"CartList",
components:{
 scroll,
 CartListitem
},
computed:{
  ...mapGetters(['carList'])
},
activated() {
  this.$refs.scroll.refresh();
},
}
</script>

<style scoped>
 .cart-list{
  height: 100vh;
  /* height:calc(100% - 44px - 49px); */
 }
 .content{
    height:calc(100% - 44px - 49px - 43px);
    /* height: 100%; */
    overflow: hidden;

  }
</style>