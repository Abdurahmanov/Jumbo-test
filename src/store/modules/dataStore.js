import axios from 'axios';

const state = {
  data: [],
  isLoading: true,
  searchedData: [],
  isLoadingSearchedData: false,
  isLoadingUpdateSearchedData: false,
};

const getters = {
  capitalizeFirstLetter: () => string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  getUniqueSearchedCities: (state, getters) => data => {
    const newArr = state.searchedData.map(item => getters.capitalizeFirstLetter(item));
    return [...new Set([getters.capitalizeFirstLetter(data), ...newArr])];
  },
  getFilteredSearchedData: state => data => {
    return state.searchedData.filter(item => item !== data);
  },
  getSearchedLoading: state => {
    return state.isLoadingSearchedData || state.isLoadingUpdateSearchedData;
  },
};

const actions = {
  getData({ commit, state }) {
    if (!state.data.length) {
      axios
        .get(
          'https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000/c4357a15-46e2-4542-8e93-6aa6a0c33c1e'
        )
        .then(res => {
          commit('setData', { result: res.data });
        });
    }
  },
  getSearchedData({ commit }) {
    commit('setIsLoadingSearchedData', { flag: true });
    axios
      .get(
        'https://api.jsonstorage.net/v1/json/d7a24bbc-6c1e-414b-b649-5e60058dd58c/6372c018-aaf9-4b71-9444-2a68369466fb'
      )
      .then(res => {
        commit('setSearchedData', { result: res.data });
      })
      .finally(() => {
        commit('setIsLoadingSearchedData', { flag: false });
      });
  },
  updateSearchedData({ dispatch, commit }, data) {
    commit('setIsLoadingUpdateSearchedData', { flag: true });
    axios
      .put(
        'https://api.jsonstorage.net/v1/json/d7a24bbc-6c1e-414b-b649-5e60058dd58c/6372c018-aaf9-4b71-9444-2a68369466fb?apiKey=4af4f9cf-fb66-402b-903b-daec12d598ad',
        data
      )
      .then(() => {
        dispatch('getSearchedData');
      })
      .finally(() => {
        commit('setIsLoadingUpdateSearchedData', { flag: false });
      });
  },
  removeSearchedDataItem({ dispatch }, data) {
    dispatch('updateSearchedData', data);
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
  setSearchedData(state, { result }) {
    state.searchedData = result;
  },
  setIsLoadingSearchedData(state, { flag }) {
    state.isLoadingSearchedData = flag;
  },
  setIsLoadingUpdateSearchedData(state, { flag }) {
    state.isLoadingUpdateSearchedData = flag;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
