<template>
  <div v-if="Object.keys(detailInfo).length!==0" class="goods-off">
  <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
   </div>     
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div> 
      <div class="info-list" >
      <img v-for="(item,index)  in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
    </div> 
 
  </div>
</template>

<script>
export default {
name:"DetailGoodsInfo",

props:{ 
  detailInfo:{ 
      type:Object,
      default(){
        return {}
      }   
  },
  data() {
    return {
      count:0,
      imagesLength:0
    }
  },

 },
  methods: {
    imgLoad() {
        // if (++this.count === this.imagesLength) {
      this.$emit("imgLoad");
       // console.log('imgLoad');       
       //}    
         
    },    
  },
  watch: {
   detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;   
      // console.log(this.imagesLength);   
    }
  }
}
</script>

<style scoped>
.goods-info{
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8,
}
.info-desc{
  padding: 0 15px;

}
.info-desc .start,
.info-desc .end{
  /* position: relative; */
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start{
  float: left;
}
.info-desc .end{
  float: right;
}
.info-desc .start::before,
.info-desc .end::after{

  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background: #333333;

}
.info-desc .end::after{
  right: 0;
}
.info-desc .desc{
  font-size: 14px;
  padding: 15px 0;
}
.info-key{
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}
.info-list img{
   width: 100%;
  
  
}
</style>