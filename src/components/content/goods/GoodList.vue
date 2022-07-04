<template>
  <div class="goods">
  <goods-list-itme v-for="(item,id) in goods" :key="id" :goodsItem=item></goods-list-itme>
 
  </div>
</template>

<script>
import GoodsListItme from './GoodsListItme'

export default {
name:"GoodsList",
props:{
  goods:{
    type:Array,
    default(){
      return []
    }
  }
},
components: {
  GoodsListItme
}
}
</script>

<style>
.goods{
  display: flex;
   flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>