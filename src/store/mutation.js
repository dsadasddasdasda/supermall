import{
 ADD_COUNTER,
 ADD_TO_CART
}from './mutation-types' 
export default{ // [ADD_COUNTER] [ADD_TO_CART] 抽取的常量
  [ADD_COUNTER](state,payload){ //抽取的mutation
    payload.count++;
   },
  [ADD_TO_CART](state,payload){
    payload.checked=false;
    state.carList.push(payload)
   }
}