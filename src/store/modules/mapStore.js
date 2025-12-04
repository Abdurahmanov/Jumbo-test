/**
 * @module mapStore
 * @description The Vuex store module for managing the map state.
 */

const state = {
  /**
   * The Google Map instance.
   * @type {object}
   */
  map: undefined,
  /**
   * The reference to the list of stores.
   * @type {object}
   */
  listRef: undefined,
  /**
   * The index of the active list item.
   * @type {number}
   */
  listItemActiveIndex: undefined,
};

const getters = {
  /**
   * Gets the search result from the data store.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @param {object} rootState The Vuex root state.
   * @returns {function} A function that takes a search string and returns the filtered data.
   */
  getSearchResult: (state, getters, rootState) => search => {
    if (search !== '') {
      return rootState.dataStore.data.filter(item => item.city.toLowerCase() === search.toLowerCase());
    }
    return rootState.dataStore.data;
  },
  /**
   * Gets the markers from the data store.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @param {object} rootState The Vuex root state.
   * @returns {Array} The markers.
   */
  getMarkers: (state, getters, rootState) => {
    return rootState.dataStore.data;
  },
  /**
   * Gets the list reference.
   * @param {object} state The Vuex state.
   * @returns {object} The list reference.
   */
  getListRef: state => {
    return state.listRef;
  },
  /**
   * Gets the filtered stores that are open until a certain time.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @param {object} rootState The Vuex root state.
   * @returns {function} A function that takes a time and returns the filtered data.
   */
  getFilterStoresOpenUtilTime: (state, getters, rootState) => time => {
    return rootState.dataStore.data.filter(item => item.todayClose.split(':')[0] >= time);
  },
  /**
   * Gets the filtered stores based on the filter type.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @param {object} rootState The Vuex root state.
   * @returns {function} A function that takes a filter type and returns the filtered data.
   */
  getFilters: (state, getters, rootState) => type => {
    switch (type) {
      case 'sundayOpen':
        return rootState.dataStore.data.filter(item => item.sundayOpen);
      case 'new':
        return rootState.dataStore.data.filter(item => item.newStore !== 0);
      case 'openUntil19':
        return getters.getFilterStoresOpenUtilTime(19);
      case 'openUntil20':
        return getters.getFilterStoresOpenUtilTime(20);
      case 'openUntil21':
        return getters.getFilterStoresOpenUtilTime(21);
      case 'openUntil22':
        return getters.getFilterStoresOpenUtilTime(22);
      default:
        return rootState.dataStore.data;
    }
  },
};

const actions = {
  /**
   * Gets the center of the map.
   * @param {object} context The Vuex context.
   * @param {object} position The position to center the map on.
   */
  getCenter({ commit }, position) {
    commit('setCenter', { position });
  },
  /**
   * Gets the zoom of the map.
   * @param {object} context The Vuex context.
   * @param {number} zoom The zoom level.
   */
  getZoom({ commit }, zoom) {
    commit('setZoom', { zoom });
  },
  /**
   * Gets the map instance.
   * @param {object} context The Vuex context.
   * @param {object} map The map instance.
   */
  getMap({ commit }, map) {
    commit('setMap', { map });
  },
  /**
   * Gets the list reference.
   * @param {object} context The Vuex context.
   * @param {object} ref The list reference.
   */
  getListRef({ commit }, ref) {
    commit('setListRef', { ref });
  },
  /**
   * Gets the active list item index.
   * @param {object} context The Vuex context.
   * @param {number} index The active list item index.
   */
  getListItemActiveIndex({ commit }, index) {
    commit('setListItemActiveIndex', { index });
  },
};

const mutations = {
  /**
   * Sets the center of the map.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {object} payload.position The position to center the map on.
   */
  setCenter(state, { position }) {
    state.map.panTo(position);
  },
  /**
   * Sets the zoom of the map.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {number} payload.zoom The zoom level.
   */
  setZoom(state, { zoom }) {
    state.map.setZoom(zoom);
  },
  /**
   * Sets the map instance.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {object} payload.map The map instance.
   */
  setMap(state, { map }) {
    state.map = map;
  },
  /**
   * Sets the list reference.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {object} payload.ref The list reference.
   */
  setListRef(state, { ref }) {
    state.listRef = ref;
  },
  /**
   * Sets the active list item index.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {number} payload.index The active list item index.
   */
  setListItemActiveIndex(state, { index }) {
    state.listItemActiveIndex = index;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
