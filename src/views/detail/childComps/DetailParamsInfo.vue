<template>
   <!-- 如果有值才会渲染 -->
  <div class="param-info" v-if="Object.keys(paramsInfo).length!==0">
   
      <table v-for="(table,indexs) in paramsInfo.rule.tables" :key="indexs" class="info-size">
         <tr v-for="(tr,indey) in table" :key="indey">
           <td v-for="(td,indez) in tr" :key="indez">
             {{td}}
           </td>
         </tr>
      </table>
      <h5>---------------------------</h5>
      <table class="info-param">
        <tr v-for="(info,index) in paramsInfo.info.set" :key="index" class="trs">
          <td class="info-param-key">{{info.key}}</td>
          <td class="param-value">{{info.value}}</td>
        </tr>
      </table>
      <div class="info-img" v-if="paramsInfo.info.images">
        <img :src="paramInfo.info.images[0]" alt="">
      </div>
  </div>
</template>

<script>
export default {
name:"DetailParamsInfo",
props:{
  paramsInfo:{
    type:Object,
    default(){
      return {}
    }
  }
}
}
</script>

<style  scoped>
.param-info{
  padding: 20px 15px;
  font-size: 14px;
  border-bottom:5px solid #f2f5f8
}
.param-info table{
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr{
  height: 42px;
}
.param-value{
  color: #e42d39;
}
/* tr{
  border: 1px solid #6c6e6f;
} */
.trs{
  border-bottom: 1px solid #6c6e6f;
}
</style>