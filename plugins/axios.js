import axios from 'axios'
import EventBusUtil from '@/utils/eventBusUtil'

const instance = axios.create({
  baseURL: process.env.baseUrl
})

instance.interceptors.response.use(
  response => response,
  error => {
    EventBusUtil.$emit('axios-interceptor-throws-error', error)
  }
)

export default instance
