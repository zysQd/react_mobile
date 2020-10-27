// 封装axios，定义拦截器
import axios from 'axios'

const request = axios.create({
  baseURL: '/',
  // headers: {},
  // timeout: 10000
})

/* 
  触发请求拦截器--发送请求--响应拦截器--触发then/catch/await
*/
// 请求拦截器（设置公共请求参数、请求头）
request.interceptors.request.use(
  // config 请求的所有信息
  (config) => {
    /* // token 就是用户登陆凭证令牌
    if (token) {
      // 标准写法
      config.headers['authorization'] = `Bearer${token}`
      config.headers['token'] = token
    } */
    return config
  },
)
// 响应拦截器
request.interceptors.response.use(
  // 响应成功
  (response) => {
    // 看功能是否成功。根据code判断
    if (response.data.code === 2000) {
      // 功能成功 -- 返回成功的数据
      return response.data.data
    }else{
      return Promise.reject(response.data.message)
    }
  },
  // 响应失败
  (error) => {
    // 根据响应状态码，提供不同的错误信息
    if (error.message) {
      // 根据失败状态码做出相应的提示
      if (error.message.status === 401) {
        
      }
    } else {
      // 服务器未返回响应
      // 判断请求超时(timeout)还是网络错误(network err)
    }
  }
)

export default request