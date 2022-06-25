import axios from 'axios';

const state = {
  data: [],
  isLoading: true,
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
};

export default {
  state,
  actions,
  mutations,
};
