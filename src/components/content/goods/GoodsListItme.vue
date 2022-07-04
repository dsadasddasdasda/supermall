<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:"GoodsListItme",
props:{
  goodsItem:{
    type:Object,
    default(){
      return []
    }
  },
 
},
computed:{
  // 如果前面为空，取后面的值
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
 methods: {
    imgLoad(){
        // console.log(this.$bus.$emit('imgeLoad'));
      this.$bus.$emit('imgLoad')//发送到home，利用让拿到30个数据进行计算加载，这样不会卡顿，声明一个min.js的事件总线
    
     
    },
    itemClick(){
      //跳转详情页
      // console.log("跳转详情页");
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  },
}
</script>

<style>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    border-radius: 5%;
    width: 100%;
  }
  
  .goods-info{
    font-size: 12px;
    position:absolute;
    bottom: 5px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;

  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>