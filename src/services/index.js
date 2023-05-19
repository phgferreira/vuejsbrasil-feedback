import axios from 'axios'
import AuthService from './auth'
import router from '@/router'
import UsersService from './users'
import { setGlobalLoading } from '@/store/global'

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  /* FIXME: TypeError: Cannot read properties of undefined (reading 'status')
    at eval (index.js:30:1)
    at async Object.login (auth.js:19:1)
    at async Proxy.handleSubmit (index.vue:84:1)
   */
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500
  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }
  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }
  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
