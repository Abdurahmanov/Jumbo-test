const state = {
  activeIndex: undefined,
};

const getters = {
  getFilterStoresByCities: (state, getters, rootState) => city => {
    return rootState.dataStore.data.filter(item => item.city === city);
  },
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
  getCitySearchResult: (state, getters) => search => {
    if (search !== '') {
      return getters.getUniqCities.filter(item => item.city.toLowerCase() === search.toLowerCase());
    }
    return getters.getUniqCities;
  },
};

const actions = {
  getActiveIndex({ commit }, index) {
    commit('setActiveIndex', { index });
  },
};

const mutations = {
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
