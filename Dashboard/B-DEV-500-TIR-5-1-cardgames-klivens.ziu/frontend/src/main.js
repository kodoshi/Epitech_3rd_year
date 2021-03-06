import Vue from 'vue'
import ElementUI from 'element-ui';
import {router} from './router'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  data: {
    bgc: {
      backgroundColor: 'black'
    }
  },
  router,
  render: h => h(App),
}).$mount('#app');

