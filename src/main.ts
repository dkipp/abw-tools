import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { defineCustomElements } from '@orgenic/orgenic-ui/dist/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/og-\w*/];

defineCustomElements(window);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
