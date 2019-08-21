import axios from 'axios'
import EventBusUtil from '@/utils/eventBusUtil'

const instance = axios.create({
  baseURL: 'http://loesje.local/wp-json/'
})

instance.interceptors.response.use(
  response => response,
  error => {
    EventBusUtil.$emit('axios-interceptor-throws-error', error)
  }
)

export default instance
