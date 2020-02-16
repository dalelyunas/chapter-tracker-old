import Vue from 'vue';
import Vuetify, { VCard, VTab, VButton } from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VCard,
    VButton,
    VTab
  }
});

const opts = {};

export default new Vuetify(opts);
