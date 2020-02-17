import Vue from 'vue';
import App from './App.vue';
import './styles.scss';

import LabelValue from './LabelValue.vue';

Vue.component('label-value', LabelValue);

/* eslint-disable no-new */
new Vue({
  render: (h) => h(App)
}).$mount('#app');
