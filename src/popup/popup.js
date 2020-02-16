import Vue from 'vue';
import App from './App.vue';
import vuetify from '../../plugins/vuetify';

import LabelValue from './LabelValue.vue';

Vue.component('label-value', LabelValue);

/* eslint-disable no-new */
new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
