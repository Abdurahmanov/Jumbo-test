/**
 * @module cityStore
 * @description The Vuex store module for managing the city state.
 */
const state = {
  /**
   * The index of the active city.
   * @type {number}
   */
  activeIndex: undefined,
};

const getters = {
  /**
   * Gets the filtered stores by city.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @param {object} rootState The Vuex root state.
   * @returns {function} A function that takes a city and returns the filtered data.
   */
  getFilterStoresByCities: (state, getters, rootState) => city => {
    return rootState.dataStore.data.filter(item => item.city === city);
  },
  /**
   * Gets the unique cities.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @param {object} rootState The Vuex root state.
   * @returns {Array} The unique cities.
   */
  getUniqCities: (state, getters, rootState) => {
    return [
      ...new Map(
        rootState.dataStore.data.map(item => [
          item['city'],
          {
            city: item.city === '' ? 'Without city name' : item.city,
            storesLength: getters.getFilterStoresByCities(item.city).length,
            stores: getters.getFilterStoresByCities(item.city),
          },
        ])
      ).values(),
    ];
  },
  /**
   * Gets the city search result.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @returns {function} A function that takes a search string and returns the filtered data.
   */
  getCitySearchResult: (state, getters) => search => {
    if (search !== '') {
      return getters.getUniqCities.filter(item => item.city.toLowerCase() === search.toLowerCase());
    }
    return getters.getUniqCities;
  },
};

const actions = {
  /**
   * Gets the active index.
   * @param {object} context The Vuex context.
   * @param {number} index The active index.
   */
  getActiveIndex({ commit }, index) {
    commit('setActiveIndex', { index });
  },
};

const mutations = {
  /**
   * Sets the active index.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {number} payload.index The active index.
   */
  setActiveIndex(state, { index }) {
    state.activeIndex = index;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
