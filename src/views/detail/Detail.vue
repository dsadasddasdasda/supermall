<template>
  <div id="detail">
    <!-- <ul>
      <li v-for="(item,index) in $store.state.carList" :key="index">{{item}}</li>
    </ul> -->
    <detail-nav-bar class="detail-nav" 
    @titleClick="titleClick"
    ref="nav"
    ></detail-nav-bar>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll">
      <!-- scroll组件的pro-type默认值是0 获取不到监听不到 -->
       <!-- @scroll="contentScroll"监听滚动事件 -->
      <detail-swiper :top-images="topImages"></detail-swiper>  
      <detail-base-info :goods=goods></detail-base-info>
      <detail-shop-info :shop=shop></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-params-info ref="params" :params-info="itemParams"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <h2 class="rrt">推荐</h2>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>
 
<script>
import DetailNavBar from "./childComps/DetailNavBar"

import {getDetail,Goods,Shop,getRecommend} from "../../network/detail"

import DetailSwiper from '../../views/detail/childComps/DetailSwiper'
import DetailBaseInfo from '../../views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from '../../views/detail/childComps/DetailShopInfo'
import DetailParamsInfo from "../../views/detail/childComps/DetailParamsInfo"
import DetailCommentInfo from "../../views/detail/childComps/DetailCommentInfo"
import GoodsList from '../../components/content/goods/GoodList.vue'
import DetailBottomBar from '../../views/detail/childComps/DetailBottomBar.vue'

import Scroll from '../../components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import {debounce} from '../../common/utils'
import {itemListenerMixin,backTopMinxin} from '../../common/mixin.js'

import {mapActions} from 'vuex'
// import toast from '../toast/toast.vue'

export default { 
name:"Detail",
components:{
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   Scroll,
   DetailGoodsInfo,
   DetailParamsInfo,
   DetailCommentInfo,
   GoodsList,
   DetailBottomBar,
  //  toast

},
mixins:[itemListenerMixin,backTopMinxin],
data() {
  return {
    iid:null,
    topImages:[],
    goods:{} ,
    shop:{},
    detailInfo:{},
    itemParams:{},
    commentInfo:{},//评论信息
    recommends:[],
    itemImgListener:null,
    themeTopYs:[],
    getthemeTopY:null,
    currentIndex:0,
    //是否显示加入成功
    message:"",
    show:false
  }
}, 
created() {
  //保存id
   this.iid=this.$route.params.iid
   //请求详情数据
   getDetail(this.iid).then(res=>{
     console.log(res);
     //获取顶部轮播图
    const data=res.result  //每次都获取result 所以定义一个变量
    this.topImages=data.itemInfo.topImages
    //  2 获取所有商品信息
    this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       //获取店铺1信息对象
    this.shop=new Shop(data.shopInfo)
       //保存商品数据
    this.detailInfo=data.detailInfo
       //获取商品参数信息
    this.itemParams=data.itemParams
    //取出评论信息
    if(data.rate.cRate!==0){
      this.commentInfo=data.rate.list[0]
    }
 

   })
   // 请求推荐数据
   getRecommend().then(res=>{
    //  console.log(res); 
    this.recommends=res.data.list
   })
   //4 geugetthemeTopY赋值 用防抖函数 禁止多次刷新
   this.getthemeTopY=debounce(()=>{
       this.themeTopYs=[]
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    this.themeTopYs.push(Number.MAX_VALUE)//表示最大值

    console.log(this.themeTopYs);
   },200)
   
},
// mounted() {
//   const refresh=debounce(this.$refs.scroll.refresh)  
//   this.itemImgListener=()=>{
//    refresh()
//   }
//   this.$bus.$on('imgLoad',this.itemImgListener)
// },

destroyed() {// 离开时取消  deactivated因为没有缓存不能使用
  this.$bus.$off('itemImgLoad',this.itemImgListener)
},
methods: {

   ...mapActions(['addCart']),
    imgLoad() {
     this.refresh();   
    console.log('imgLoad');
    this.getthemeTopY();//图片加载完调用防抖
   
    //获取子组件的位置并赋值      
    },
    titleClick(index){
      console.log(index);
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    //下滑对应导航栏
    contentScroll(position){
     //获取Y值 
     const positionY=-position.y
      // positiony和主题的中的值进行比较
      // [0, 8934, 9875, 9896，非常大的值]
      // positionY 在0和8934之间 index=0
      // positionY 在8934和9875之间 index=1
      // positionY 在9875和9896之间 index=2
      // positionY 在9875和非常大的值之间之间 index=3
      let lenth=this.themeTopYs.length
      for(let i=0;i<lenth-1;i++){
         if(this.currentIndex !==i&& (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
           this.currentIndex=i;
           console.log(i);
             this.$refs.nav.currentIndex=this.currentIndex

         }
      }
     // 是否显示回到顶部
     this.isShow=(-position.y)>1000;
        this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    addToCart(){
      // 加入购物车
      // 获取商品信息
      const producn={}
      producn.imgage=this.topImages[0];
      producn.title=this.goods.title;
      producn.desc=this.goods.desc;
      producn.price=this.goods.realPrice;
      producn.iid=this.iid;
      //将商品加入购物车
      // this.$store.commit('addCart',producn)
      //
       this.addCart(producn).then(res=>{
        // this.message=res;
        // this.show=true
        // console.log(res);
        // setTimeout(()=>{
        //     this.message="",
        //     this.show=false
        // },1500)

        this.$toast.show(res,2000)


       })

      // this.$store.dispatch('addCart', producn).then(res=>{
      //   console.log(res);
      // })
     
    }
},

}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
  .rrt{
    padding: 2px 0 5px 1 3px;
    font-size: 18px;
    
  }
</style> 