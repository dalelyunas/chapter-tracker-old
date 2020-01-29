import Vue from 'vue';
import { BCard, BLink, BButton } from 'bootstrap-vue';
import App from './App.vue';

import DataPairView from './DataPairView.vue';

import 'bootstrap/dist/css/bootstrap.css';

Vue.component('b-card', BCard);
Vue.component('b-link', BLink);
Vue.component('b-button', BButton);

Vue.component('data-pair-view', DataPairView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
