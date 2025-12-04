import axios from 'axios';

/**
 * @module dataStore
 * @description The Vuex store module for managing the application data.
 */
const state = {
  /**
   * The store data.
   * @type {Array}
   */
  data: [],
  /**
   * Whether the data is loading.
   * @type {boolean}
   */
  isLoading: true,
  /**
   * The searched data.
   * @type {Array}
   */
  searchedData: [],
  /**
   * Whether the searched data is loading.
   * @type {boolean}
   */
  isLoadingSearchedData: false,
  /**
   * Whether the searched data is updating.
   * @type {boolean}
   */
  isLoadingUpdateSearchedData: false,
  /**
   * Whether there is an error.
   * @type {boolean}
   */
  isError: false,
};

const getters = {
  /**
   * Capitalizes the first letter of a string.
   * @returns {function} A function that takes a string and returns the capitalized string.
   */
  capitalizeFirstLetter: () => string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  /**
   * Gets the unique searched cities.
   * @param {object} state The Vuex state.
   * @param {object} getters The Vuex getters.
   * @returns {function} A function that takes a city and returns the unique searched cities.
   */
  getUniqueSearchedCities: (state, getters) => data => {
    const newArr = state.searchedData.map(item => getters.capitalizeFirstLetter(item));
    return [...new Set([getters.capitalizeFirstLetter(data), ...newArr])];
  },
  /**
   * Gets the filtered searched data.
   * @param {object} state The Vuex state.
   * @returns {function} A function that takes a city and returns the filtered searched data.
   */
  getFilteredSearchedData: state => data => {
    return state.searchedData.filter(item => item !== data);
  },
  /**
   * Gets the searched loading state.
   * @param {object} state The Vuex state.
   * @returns {boolean} The searched loading state.
   */
  getSearchedLoading: state => {
    return state.isLoadingSearchedData || state.isLoadingUpdateSearchedData;
  },
  /**
   * Gets the show page state.
   * @param {object} state The Vuex state.
   * @returns {boolean} The show page state.
   */
  getShowPage: state => {
    return !state.isLoading && !state.isError;
  },
};

const actions = {
  /**
   * Gets the data from the API.
   * @param {object} context The Vuex context.
   */
  getData({ commit, state }) {
    commit('setIsError', { flag: false });
    if (!state.data.length) {
      axios
        .get(
          'https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000/c4357a15-46e2-4542-8e93-6aa6a0c33c1e'
        )
        .then(res => {
          commit('setData', { result: res.data });
        })
        .catch(e => {
          console.error(e);
          commit('setIsError', { flag: true });
        })
        .finally(() => {
          commit('setIsLoading', { flag: false });
        });
    }
  },
  /**
   * Gets the searched data from the API.
   * @param {object} context The Vuex context.
   */
  getSearchedData({ commit }) {
    commit('setIsLoadingSearchedData', { flag: true });
    axios
      .get(
        'https://api.jsonstorage.net/v1/json/d7a24bbc-6c1e-414b-b649-5e60058dd58c/6372c018-aaf9-4b71-9444-2a68369466fb'
      )
      .then(res => {
        commit('setSearchedData', { result: res.data });
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        commit('setIsLoadingSearchedData', { flag: false });
      });
  },
  /**
   * Updates the searched data on the API.
   * @param {object} context The Vuex context.
   * @param {Array} data The data to update.
   */
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
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        commit('setIsLoadingUpdateSearchedData', { flag: false });
      });
  },
  /**
   * Removes a searched data item.
   * @param {object} context The Vuex context.
   * @param {Array} data The data to update.
   */
  removeSearchedDataItem({ dispatch }, data) {
    dispatch('updateSearchedData', data);
  },
};

const mutations = {
  /**
   * Sets the data.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {Array} payload.result The data.
   */
  setData(state, { result }) {
    state.data = result.map(item => {
      return {
        ...item,
        addressName: item.addressName.replace(/Jumbo /gi, ''),
        position: { lat: Number(item.latitude), lng: Number(item.longitude) },
      };
    });
  },
  /**
   * Sets the loading state.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {boolean} payload.flag The loading state.
   */
  setIsLoading(state, { flag }) {
    state.isLoading = flag;
  },
  /**
   * Sets the searched data.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {Array} payload.result The searched data.
   */
  setSearchedData(state, { result }) {
    state.searchedData = result;
  },
  /**
   * Sets the searched data loading state.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {boolean} payload.flag The searched data loading state.
   */
  setIsLoadingSearchedData(state, { flag }) {
    state.isLoadingSearchedData = flag;
  },
  /**
   * Sets the searched data updating state.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {boolean} payload.flag The searched data updating state.
   */
  setIsLoadingUpdateSearchedData(state, { flag }) {
    state.isLoadingUpdateSearchedData = flag;
  },
  /**
   * Sets the error state.
   * @param {object} state The Vuex state.
   * @param {object} payload The payload.
   * @param {boolean} payload.flag The error state.
   */
  setIsError(state, { flag }) {
    state.isError = flag;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
