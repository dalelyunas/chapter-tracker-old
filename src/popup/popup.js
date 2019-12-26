import Vue from 'vue'
import App from './App'
import { BCard } from 'bootstrap-vue'
import DataPairView from './DataPairView';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('b-card', BCard);
Vue.component('data-pair-view', DataPairView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
