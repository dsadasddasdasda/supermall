<template>
    <div class="tab-bar-itme" @click="itmeClick">
      <div v-if="!isActive"><slot name="itme-icon"></slot></div> 
      <div v-else><slot name="itme-icon-active"></slot></div> 
      <div :style="activestyle"><slot name="itme-text"></slot></div> 
      
    </div>
</template>

<script>
export default {
  name:"TabBaritme",
  props:{
   path:String,
   activeColor:{
     type:String,
     default:"red"//没传参就默认为红色
   }
  },
  data() {
    return {
      // isActive:true
    }
  },
  computed:{
   isActive(){
    return this.$route.path.indexOf(this.path)!==-1
   },
   activestyle(){
     return this.isActive?{color:this.activeColor}:{}
   }
  },
  methods: {
    itmeClick(){
     this.$router.replace(this.path).catch(err=>{})
   
    }
  },
}
</script>

<style>
.tab-bar-itme{
  flex: 1;
  text-align: center;
  height: 49px;
 
}
  .tab-bar-itme img{
    width: 24px;
  }

</style>