import axios from 'axios';

const state = {
    data: [],
    center: {},
    zoom: 7,
};

const getters = {
    getCities: state => {
        return new Set(state.data.map(item => item.city).filter(Boolean))
    },
    getStores: state => {
        return new Set(state.data.map(item => item.addressName.replace(/Jumbo /gi,'')).filter(Boolean))
    },
    getSearchResult: state => search => {
        if(search !== '') {
            return state.data.find(item => item.city.toLowerCase() === search.toLowerCase())
        }
    },
    getFilterStoresByCities: state => city => {
        return state.data.filter(item => item.city === city)
    },

    getMarkers: state => {
        return state.data.map(item => {
            return {
                ...item,
                addressName: item.addressName.replace(/Jumbo /gi,''),
                id: item.uuid,
                position: { lat: Number(item.latitude), lng: Number(item.longitude) }
            }
        })
    },
    getCenter: (state, getters) => index => {
        console.log(index)
        return getters.getMarkers[index].position
    },

    getZoom: state => zoom => {
        return zoom
    }
}

const actions = {
    getData({ commit }) {
        axios.get('https://api.jsonstorage.net/v1/json/00000000-0000-0000-0000-000000000000/c4357a15-46e2-4542-8e93-6aa6a0c33c1e').then((res) => {
            commit('setData', { result: res.data });
        });
    },
};

const mutations = {
    setData(state, { result }) {
        state.data = result.map(item => {
            return {
                ...item,
                addressName: item.addressName.replace(/Jumbo /gi,''),
                id: item.uuid,
                position: { lat: Number(item.latitude), lng: Number(item.longitude) }
            }
        });
        state.center = state.data[1].position
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};