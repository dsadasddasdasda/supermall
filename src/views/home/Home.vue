<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control 
   :titles="['流行','新款','精选']" 
   @itemClick="itemClick" 
   ref="tabControl1" class="tab-control" v-show="isTabFixed">
   </tab-control> 

  <scroll class="content" ref="scroll" :probe-type="3" @scroll="conetScroll" :pull-up-load="true" @pullingUp="loadMore">     
  <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/> 
  <recommend-view :recommends="recommends"></recommend-view>
  <feature-view></feature-view>
   <tab-control 
   :titles="['流行','新款','精选']" 
   @itemClick="itemClick" 
   ref="tabControl2">
   </tab-control>
   <good-list :goods="goods[currentType].list"></good-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"></back-top>


</div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
// import GoodsList from '../../components/content/goods/GoodList'
import BackTop from '../../components/content/backTop/BackTop'
import Scroll from '../../components/common/scroll/Scroll'
import GoodList from '../../components/content/goods/GoodList.vue'

import {getHomeMultidata,getHomeGoods} from '../../network/home'
import {debounce} from "../../common/utils"
import {itemListenerMixin} from '../../common/mixin'

export default {
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    // GoodsList,
    GoodList,
    Scroll,
    BackTop,
    

  },  
  mixins:[itemListenerMixin],  
  data() {
    return {
      // 处理请求得数据
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      //  currentType:'pop',
      currentType:"new",
       isShow:false,
       tabOffsetTop:0,
       isTabFixed:false,
       saveY:0,//保存离开页面得值
       itemImgListener:null
    }  
  },
  created() {
    // 请求多个数据
    // 用this调用下面得
    this.getHomeMultidata();
    //请求商品数据
   this.getHomeGoods('pop');
   this.getHomeGoods('new');
   this.getHomeGoods('sell');

  },
  activated() {
    //活跃
    this.$refs.scroll.refresh();//回来时候刷新
    this.$refs.scroll.scrollTo(0,this.saveY,0)
   
    console.log('111');
  },
  deactivated() {
    // 离开时记录状态
    // this.saveY=this.$refs.scroll.getScrollY()
    this.saveY=this.$refs.scroll.getScrollY();
    console.log(this.saveY);
    // 离开时 移除
     this.$bus.$off('itemImgLoad',this.itemImgListener)
    
  },
  // mounted() {
  //   //图片加载完成监听事件
  //   // func=this.$refs.scroll.refresh()
  //   const refresh=debounce(this.$refs.scroll.refresh)  
  //     //监听item中的事件完成
  //     //保存数据
  //   this.itemImgListener=()=>{    
  //   refresh();
  //  }
  //   this.$bus.$on('imgLoad',this.itemImgListener)
  // //  2获取tabControl的offsetTop

  // },
  methods: {
    // debounce(func,delay){
    //   let timer=null;
    //   return function(...args){
  
    //     if(timer){
    //       clearTimeout(timer)
    //       };
    //     timer = setTimeout(()=>{   
           
    //        func.apply(this,args)  
            
    //     },delay)
    //   }
      
    // },
    
    //包装一层写主要逻辑，在created调用
    getHomeMultidata(){
       getHomeMultidata().then((res) => {
      console.log(res);
      // this.result=res
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    }).catch((err) => {     
    });
    },
    getHomeGoods(type) {
    const page = this.goods[type].page + 1
    getHomeGoods(type, page).then((res) => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1,
          //加载多次；
          this.$refs.scroll.finishPullUp()

        })
    },
    //上面都是网络请求
    itemClick(index){
      //  console.log(index);
      switch (index) {
          case 0:
            this.currentType = 'new'
            break
          case 1:
            this.currentType = 'pop'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
    },
    backClick(){
     this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    conetScroll(position){
      this.isShow=(-position.y)>1000;//大于一千显示按钮：isshow绑定上面的isshow  负是因为往下滚动
      // 2 决定tabControl是否吸顶（position:fixd）
      this.isTabFixed=(-position.y)>this.tabOffsetTop

    },
    loadMore(){
    this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
  },
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: sticky;

  
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
.tab-control{
  position: relative;
  z-index: 9;
}

</style>