<template>
  <div class="toasts" v-show="iSshow">
    {{message}}
  </div>
</template>

<script>
export default {
  name:"Toast",
  data() {
    return {
      message:"",
      iSshow:false
    }
  },
  // props:{
  //   message:{
  //     type:String,
  //     default:""
  //   },
  //    show:{
  //    type:Boolean,
  //    default:false
  // }
  // },
  methods: {
    show(message,duration){
      this.iSshow=true;
      this.message=message;
      
      setTimeout(()=>{
        this.iSshow=false;
        this.message="";
      },duration)
    }
  },
 
}
</script>

<style scoped>
  .toasts{
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.503);
   padding: 8px 10px;
   z-index: 999;
   transform: translate(-50%,-50%);
   color: #fff;
  }
</style>