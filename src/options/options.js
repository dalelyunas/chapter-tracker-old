import Vue from 'vue';
import App from './App';
import {
  BButton,
  BCard,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BTabs,
  BTab,
  BCollapse,
  VBToggle
} from 'bootstrap-vue';
import VueHighlightJS from 'vue-highlightjs';

import ParserView from './page-parser/ParserView';
import AddParserForm from './page-parser/AddParserForm';
import PageParserTab from './page-parser/PageParserTab';
import ParserInstructions from './page-parser/ParserInstructions';

import BookTab from './book/BookTab';
import BookViewGroup from './book/BookViewGroup';
import BookView from './book/BookView';

import 'bootstrap/dist/css/bootstrap.css';
import 'highlight.js/styles/github.css';

Vue.component('b-button', BButton);
Vue.component('b-card', BCard);
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);
Vue.component('b-form-textarea', BFormTextarea);
Vue.component('b-tabs', BTabs);
Vue.component('b-tab', BTab);
Vue.component('b-collapse', BCollapse);

Vue.directive('b-toggle', VBToggle);

Vue.component('parser-view', ParserView);
Vue.component('add-parser-form', AddParserForm);
Vue.component('parser-instructions', ParserInstructions);
Vue.component('page-parser-tab', PageParserTab);

Vue.component('book-tab', BookTab);
Vue.component('book-view-group', BookViewGroup);
Vue.component('book-view', BookView);

Vue.use(VueHighlightJS);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
