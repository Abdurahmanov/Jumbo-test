const state = {
  center: {},
  zoom: 7,
  map: undefined,
  listRef: undefined,
  listItemActiveIndex: undefined,
};

const getters = {
  getStores: (state, getters, rootState) => {
    return new Set(rootState.dataStore.data.map(item => item.addressName.replace(/Jumbo /gi, '')).filter(Boolean));
  },
  getSearchResult: (state, getters, rootState) => search => {
    if (search !== '') {
      return rootState.dataStore.data.filter(item => item.city.toLowerCase() === search.toLowerCase());
    }
    return rootState.dataStore.data;
  },
  getMarkers: (state, getters, rootState) => {
    return rootState.dataStore.data;
  },
  getListRef: state => {
    return state.listRef;
  },
  getFilterStoresOpenUtilTime: (state, getters, rootState) => time => {
    return rootState.dataStore.data.filter(item => item.todayClose.split(':')[0] >= time);
  },
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
  getCenter({ commit }, position) {
    commit('setCenter', { position });
  },
  getZoom({ commit }, zoom) {
    commit('setZoom', { zoom });
  },
  getMap({ commit }, map) {
    commit('setMap', { map });
  },
  getListRef({ commit }, ref) {
    commit('setListRef', { ref });
  },
  getListItemActiveIndex({ commit }, index) {
    commit('setListItemActiveIndex', { index });
  },
};

const mutations = {
  setCenter(state, { position }) {
    state.map.panTo(position);
  },
  setZoom(state, { zoom }) {
    state.map.setZoom(zoom);
  },
  setMap(state, { map }) {
    state.map = map;
  },
  setListRef(state, { ref }) {
    state.listRef = ref;
  },
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
