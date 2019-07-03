import axios from 'axios'
import { Toast } from 'antd-mobile'

const error = () => {
  Toast.offline('数据加载失败！', 1)
}

const service = axios.create({
  baseURL: 'http://localhost:5100/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => config,
  err => {
    error()
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  respones => respones.data,
  err => {
    error()
    return Promise.reject(err)
  }
)

export default service
