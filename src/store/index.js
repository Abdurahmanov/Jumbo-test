import Vue from 'vue';
import Vuex from 'vuex';

import mapStore from './modules/mapStore';
import dataStore from './modules/dataStore';
import cityStore from './modules/cityStore';

Vue.use(Vuex);

/**
 * The Vuex store.
 * @module store
 */
export default new Vuex.Store({
  /**
   * The Vuex modules.
   * @property {object} modules
   * @property {object} modules.mapStore The map store module.
   * @property {object} modules.cityStore The city store module.
   * @property {object} modules.dataStore The data store module.
   */
  modules: {
    mapStore,
    cityStore,
    dataStore,
  },
});
