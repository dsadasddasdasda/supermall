<template>
  <div ref="wrapper" >
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name:"Scroll",
props:{
    probeType:{
      Type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false//可能不需要监听
    }
},

data() {
  return {
    scroll:null,
    message:"哈哈"
  }
},
mounted() {
//创建BSroll对象 
  this.scroll=new BScroll(this.$refs.wrapper,{
    click:true,
    observeDOM:true,
    probeType:this.probeType,//  获取传参数probetype 3的监听
    pullUpLoad:this.pullUpLoad  //上拉加载更多
  })
  //  2 监听滚动位置
  this.scroll.on('scroll',(position)=>{
  this.$emit('scroll', position);//发送父组件把监听得位置发送出去
  
})
  this.scroll.scrollTo(0,0)//回到顶部   
  // 3监听scroll滚到底部加载更多
  if(this.pullUpLoad){
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  }
},
methods: {
  scrollTo(x,y,time=300){
    this.scroll && this.scroll.scrollTo(x,y,time)
  },
  finishPullUp(){
    this.scroll.finishPullUp()//scroll只能默认加载一次，用finisPullUp；加载多次在getHomeGoods
  },
  refresh(){
    console.log('----');
   this.scroll && this.scroll.refresh()
  },
  getScrollY(){
    return this.scroll ? this.scroll.y : 0
  }
},
}
</script>

<style>

</style>