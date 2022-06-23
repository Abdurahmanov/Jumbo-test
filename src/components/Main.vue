<template>
  <div>
    <button @click.prevent="show = 'stores'">Show stores</button>
    <button @click.prevent="show = 'cities'">Show cities</button>
    <input type="text" v-model="search">
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
              v-for="(marker, index) in getMarkers"
              :key="marker.id"
              :marker="marker"
              :google="google"
              :map="map"
              :index="index"
          />
        </template>
      </GoogleMapLoader>
      <MarketList/>
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
    };
  },
  mounted() {
    this.$store.dispatch('getData');
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

    mapConfig() {
      return {
        ...mapSettings,
        center: this.getMarkers[1].position,
      };
    },

  },
};
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
  }

  li {
    display: inline-block;
    background: #fdc513;
    margin: 5px;
  }

  .wrapper {
    position: relative;
  }
</style>
