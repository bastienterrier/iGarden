import Vue from 'vue';
import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';

import '@babel/polyfill';
import { Utils } from './utils/utils';

Vue.config.productionTip = false;

Utils.initialize().then(() => {
  new Vue({
    router,
    store,
    vuetify: new Vuetify(),
    render: h => h(App),
  }).$mount('#app');
});
