import Vue from 'vue';
import Vuex from 'vuex';

import mapStore from './modules/mapStore';
import dataStore from './modules/dataStore';
import cityStore from './modules/cityStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mapStore,
    cityStore,
    dataStore,
  },
});
