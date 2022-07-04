<template>
  <div class="bootom-bar">
    <div class="check-content">
      <check-button 
      :is-checked="isSelect" 
      @click.native="checkClick"
      class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="tatal">
      合计 : {{totalPrice}}
    </div>

    <div class="calculate"> 
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
 name:"CartBottonBar",
 components: {
  CheckButton,
 },
 computed:{
  ...mapGetters(['carList']),
  totalPrice(){
        return  this.carList.filter(item=>{ //过滤掉没有选中的商品
          return item.checked
        }).reduce((preValue,item)=>{ // reduce 中的preValue参数是累加和 第二个是商品
          return preValue+ item.price * item.count
        },0).toFixed(2)
  },
  checkLength(){
    return this.carList.filter(item=>item.checked).length
  },
  isSelect(){
    if(this.carList.length===0) return false
    // 使用find
    // return !this.carList.find(item=> !item.checked)
    for(let item of this.carList){
      if(!item.checked){
        return false
      }
    }
    return true
  } 
 },
 methods: {
   checkClick(){
    if(this.isSelect){
      this.carList.forEach(item=>item.checked=false)
    }else{
      this.carList.forEach(item=>item.checked=true)
    }
   }
 },
}
</script>

<style scoped>
.bootom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 136px;
  line-height: 40px;
  display: flex;
}

.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;

}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  border: 2px solid rgb(218 192 192);
}
.tatal{
  margin-left: 20px;
  flex: 1;
}

.calculate{
  width: 90px;
  background-color: rgb(215, 6, 6);
  color: #fff;
  text-align: center;
  font-size: 15px;
}
</style>