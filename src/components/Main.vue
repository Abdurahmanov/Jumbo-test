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
    <div class="wrapper"  v-if="getMarkersList.length">
      <GoogleMapLoader
          :mapConfig="mapConfig"
          apiKey=""
      >
        <template v-slot="{ google, map }">
          <GoogleMapMarker
              v-for="marker in getMarkersList"
              :key="marker.id"
              :marker="marker"
              :google="google"
              :map="map"
          />
        </template>
      </GoogleMapLoader>
      <MarketList/>
    </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
      'getCenter',
      'getZoom',
    ]),
    getSearch() {
      return this.getSearchResult(this.search)
    },

    getMarkersList() {
      return this.getMarkers
    },

    mapConfig() {
      return {
        ...mapSettings,
        zoom: this.getZoom(7),
        center: this.getCenter(1)
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
