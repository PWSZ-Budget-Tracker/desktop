import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import VueAxios from 'vue-axios';
import store from './store/store'

axios.defaults.baseURL = 'https://pwsz-budget-tracker.azurewebsites.net';

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['Access-Control-Allow-Origin'] = '*';
      return config;
    },
    (error) => Promise.reject(error)
);

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
// eslint-disable-next-line no-unused-vars
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}

Vue.config.productionTip = false;

Vue.use(VueApexCharts, VueAxios, axios);
Vue.component('apexchart', VueApexCharts);

new Vue({
  vuetify,
  router,
  store,
  created() {
    this.$router.push('/login')
  },
  render: h => h(App),
}).$mount('#app');
