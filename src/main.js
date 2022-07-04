import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store'
import toast from './components/common/toast/index'//安装toast
import FastClick from 'fastclick' //减少延迟300ms
// import VueLazyLoad from 'vue-lazyload'


//转换时间戳
Vue.filter('showDate',function(n){
  const result=moment(n*1000).format('Y-MM-DD hh:mm')
  return result
})
// 安装toast\
Vue.use(toast)
// 使用vueLazyLoad 懒加载
// Vue.use(VueLazyLoad)

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()//添加事件总线
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


// 解决移动端300ms毫秒
FastClick.attach(document.body)