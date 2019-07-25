import Vue from 'vue';
import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';

import '@babel/polyfill';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
