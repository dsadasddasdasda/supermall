import{
  ADD_COUNTER,
  ADD_TO_CART
 
 }from './mutation-types' 
export default{
  addCart(context,payload){ //抽取的actions
    
    /*     //发送事件  需要通过mutations来修改
        let oldProduct=null;
        for(let item of state.carList){//遍历原先的数组caList比较最近点击的数据然后比较是否存在
          if(item.iid===payload.iid){
            oldProduct=item;
            // 把值赋给state中carList
          }45
        } */ 
        // mutations 唯一的目的就是修改state中的状态
        // mutations中的每个方法尽可能完成的事件比较单一  就是只做一件事
        //另一种筛选方法
        return new Promise((resolve,reject)=>{
          //查找数组中是否有重复的数据
          const oldProduct=context.state.carList.find(item =>item.iid===payload.iid) 
          if(oldProduct){  //数量+1
            // oldProduct.count+=1 //如果的值相同 加数量
             // [ADD_COUNTER] [ADD_TO_CART] 抽取的常量
             context.commit(ADD_COUNTER,oldProduct)
             resolve('当前数量加+1')
          }else{
            payload.count=1;
            // context.state.carList.push(payload) //如果没有 则添加新的数据    payload.count=1是一条数据
            context.commit(ADD_TO_CART,payload)
            resolve('添加新的商品 ')
          } 
        })
       },
}