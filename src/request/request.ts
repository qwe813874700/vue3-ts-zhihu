import axios, { AxiosRequestConfig } from 'axios'
import store from '../store'

const icode = 'EF25ADFAB1F142A5' // API的校验码
const request = axios.create({
  baseURL: 'https://apis.imooc.com/api/',
  timeout: 10000
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
  store.commit('setLoading', true)
  if (store.state.user.token) {
    config.headers = {
      ...config.headers,
      Authorization : store.state.user.token
    }
  }
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      icode
    }
  } else if (config.method === 'get'){
    config.params = {
      icode
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  store.commit('setLoading', false)
  return response.data
}, (e) => {
  const { error } = e.response.error
  return Promise.reject(error)
})

export default request