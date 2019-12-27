import Vue from 'vue';
import App from './App';
import ParserView from './page-parser/ParserView';
import AddParserForm from './page-parser/AddParserForm';
import PageParserTab from './page-parser/PageParserTab';
import { BButton, BCard, BFormGroup, BFormInput, BFormTextarea } from 'bootstrap-vue';
import VueHighlightJS from 'vue-highlightjs';
import ParserInstructions from './page-parser/ParserInstructions';

import 'bootstrap/dist/css/bootstrap.css'
import "highlight.js/styles/github.css";

Vue.component('b-button', BButton);
Vue.component('b-card', BCard);
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);
Vue.component('b-form-textarea', BFormTextarea);

Vue.component('parser-view', ParserView);
Vue.component('add-parser-form', AddParserForm);
Vue.component('parser-instructions', ParserInstructions);
Vue.component('page-parser-tab', PageParserTab);

Vue.use(VueHighlightJS)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
