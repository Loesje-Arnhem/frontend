import axios from 'axios'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './app.vue'
import router from './router'
import store from './store/store'

Vue.use(Vuelidate)
axios.defaults.baseURL = '/wp-json/wp/v2/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#posters')
