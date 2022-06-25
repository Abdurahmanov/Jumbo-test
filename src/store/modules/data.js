import axios from 'axios';

const state = {
  data: [],
  center: {},
  zoom: 7,
  isLoading: true,
  map: undefined,
  listRef: undefined,
  listItemActiveIndex: undefined,
};

const getters = {
  getCities: state => {
    return new Set(state.data.map(item => item.city).filter(Boolean));
  },
  getStores: state => {
    return new Set(state.data.map(item => item.addressName.replace(/Jumbo /gi, '')).filter(Boolean));
  },
  getSearchResult: state => search => {
    if (search !== '') {
      return state.data.filter(item => item.city.toLowerCase() === search.toLowerCase());
    }
    return state.data;
  },
  getFilterStoresByCities: state => city => {
    return state.data.filter(item => item.city === city);
  },

  getMarkers: state => {
    return state.data;
  },
  getListRef: state => {
    return state.listRef;
  },
  getFilterStoresOpenUtilTime: state => time => {
    return state.data.filter(item => item.todayClose.split(':')[0] >= time);
  },
  getFilters: (state, getters) => type => {
    switch (type) {
      case 'sundayOpen':
        return state.data.filter(item => item.sundayOpen);
      case 'new':
        return state.data.filter(item => item.newStore !== 0);
      case 'openUntil19':
        return getters.getFilterStoresOpenUtilTime(19);
      case 'openUntil20':
        return getters.getFilterStoresOpenUtilTime(20);
      case 'openUntil21':
        return getters.getFilterStoresOpenUtilTime(21);
      case 'openUntil22':
        return getters.getFilterStoresOpenUtilTime(22);
      default:
        return state.data;
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
  getData({ commit }) {
    axios
      .get(
        'https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000/c4357a15-46e2-4542-8e93-6aa6a0c33c1e'
      )
      .then(res => {
        commit('setData', { result: res.data });
      });
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
  setData(state, { result }) {
    state.data = result.map(item => {
      return {
        ...item,
        addressName: item.addressName.replace(/Jumbo /gi, ''),
        id: item.uuid,
        position: { lat: Number(item.latitude), lng: Number(item.longitude) },
      };
    });
    state.isLoading = false;
  },
  setCenter(state, { position }) {
    state.map.panTo(position);
    // state.listItemActiveIndex = index;
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
