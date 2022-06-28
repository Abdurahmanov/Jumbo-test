import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import VirtualList from 'vue-virtual-scroll-list';

Vue.component('virtual-list', VirtualList);

//https://stackoverflow.com/questions/36170425/detect-click-outside-element
Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      if (!el.contains(event.target)) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
