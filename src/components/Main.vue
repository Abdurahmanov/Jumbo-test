<template>
  <div>
    <button @click.prevent="show = 'stores'">Show stores</button>
    <button @click.prevent="show = 'cities'">Show cities</button>
    <div v-if="show === 'stores'">
      <Stores />
    </div>
    <div v-if="show === 'cities'">
      <Cities/>
    </div>
    <div class="wrapper" v-if="!this.data.isLoading">
      <GoogleMapLoader
          :mapConfig="mapConfig"
          apiKey=""
      >
        <template v-slot="{ google, map }">
          <GoogleMapMarker
              v-for="(marker, index) in (filteredCities ? filteredCities : getMarkers)"
              :key="marker.id"
              :marker="marker"
              :google="google"
              :map="map"
              :index="index"
          />
        </template>
      </GoogleMapLoader>
      <div class="list-block">
        <div class="search-block">
          <input type="text" class="input" v-model="search" placeholder="Enter the name of the city">
          <button class="cross" v-show="search" @click="onClear()">+</button>
          <button class="btn" @click="onSearch()">Search</button>
        </div>
        <MarketList :getSearch="filteredCities ? filteredCities : getMarkers" :isNotFound="isNotFound"/>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import Stores from './Stores';
import Cities from './Cities';
import GoogleMapLoader from './GoogleMapLoader';
import GoogleMapMarker from './GoogleMapMarker';
import MarketList from "./MarketList";

import { mapSettings } from "@/constants/mapSettings";
export default {
  components: {
    Stores,
    Cities,
    GoogleMapLoader,
    GoogleMapMarker,
    MarketList
  },
  data() {
    return {
      show: '',
      search: '',
      filteredCities: undefined,
    };
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  methods: {
    onSearch() {
      this.filteredCities = this.getSearchResult(this.search)
    },
    onClear() {
      this.search = '';
      this.onSearch();
    }
  },
  computed:{
    ...mapGetters([
      'getSearchResult',
      'getFilterStoresByCities',
      'getMarkers',
    ]),
    ...mapState([
        'data'
    ]),
    getSearch() {
      return this.getSearchResult(this.search)
    },

    isNotFound() {
      return this.filteredCities && this.filteredCities.length === 0 ? true : false
    },

    mapConfig() {
      return {
        ...mapSettings,
        center: this.getMarkers[0].position,
      };
    },

  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    position: relative;
  }

  .list-block {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 350px;
  }

  .input {
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 0 105px 0 15px;
    border: 0;
    outline: none;
    border-radius: 4px;
    background-color: #fff;
  }

  .search-block {
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  }

  .btn {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 12px;
    color: #262626;
    padding: 7px 10px;
    border: 1px solid #262626;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
      background: #262626;
      color: white;
    }

    //&:disabled {
    //  opacity: 0.35;
    //  cursor: not-allowed;
    //}
  }

  .cross {
    position: absolute;
    top: -9px;
    right: 75px;
    font-size: 50px;
    transform: rotate(45deg);
    background: transparent;
    border: none;
    cursor: pointer;
  }
</style>
