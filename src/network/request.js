import axios from 'axios'
export function request(config){
  // 1创建实例
  const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })
  // axios拦截·
  // 1请求拦截作用
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);
  })
  // 2响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })
  // 发送网络请求
  return instance(config)
}