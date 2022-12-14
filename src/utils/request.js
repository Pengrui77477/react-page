import axios from 'axios';
import { getToken } from './token';
import { history } from './history';

const http = axios.create({
  baseURL:'http://geek.itheima.net/v1_0',
  timeout:5000
});

//请求拦截器
http.interceptors.request.use((config)=>{
  const token = getToken();
  //注入token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},(err)=>{
  return Promise.reject(err)
})

//响应拦截器
http.interceptors.response.use((response)=>{

  return response.data;
},(err)=>{
  if(err.response.status === 401){
    //跳回到登录页
    history.push('/login')
    console.log('login');
  }


  return Promise.reject(err)
})

export default http