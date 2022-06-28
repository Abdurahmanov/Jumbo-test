<template>
  <div v-if="getShowPage">
    <div class="filters">
      <div class="filters__title">Filters</div>
      <button
        v-for="item in filters"
        class="filters__btn"
        :key="item.type"
        :class="{ filters__btn_active: filterType === item.type }"
        @click="onFilterChange(item.type)"
      >
        {{ item.title }}
      </button>
    </div>
    <div class="map">
      <GoogleMapLoader :mapConfig="mapConfig" apiKey="">
        <template v-slot="{ google, map }">
          <GoogleMapMarker
            v-for="(marker, index) in filteredCities ? filteredCities : getMarkers"
            :key="marker.uuid"
            :marker="marker"
            :google="google"
            :map="map"
            :index="index"
          />
        </template>
      </GoogleMapLoader>
      <div class="list-block">
        <SearchBlock @onSearch="onSearch($event)" @onClear="onClear()" />
        <StoreList :getSearch="filteredCities ? filteredCities : getMarkers" :isNotFound="isNotFound" />
      </div>
    </div>
  </div>
  <div v-else-if="this.dataStore.isError">
    <p>
      Error
    </p>
  </div>
  <div v-else>
    <p>
      Loading...
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import GoogleMapLoader from '@/components/GoogleMapLoader';
import GoogleMapMarker from '@/components/GoogleMapMarker';
import StoreList from '@/components/StoreList';
import SearchBlock from '@/components/SearchBlock';

import { mapSettings } from '@/constants/mapSettings';
import { filters } from '@/constants/filters';
export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    StoreList,
    SearchBlock,
  },
  data() {
    return {
      filteredCities: undefined,
      filterType: 'all',
      filters: filters,
    };
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  methods: {
    changeCenterAndZoomMap(zoom = 10) {
      this.$store.dispatch('getCenter', this.filteredCities[0].position);
      this.$store.dispatch('getZoom', zoom);
    },
    onSearch(str) {
      this.filteredCities = this.getSearchResult(str);
      this.filterType = 'all';
      if (!this.isNotFound) {
        this.changeCenterAndZoomMap();
      }
    },
    onClear() {
      this.changeCenterAndZoomMap(7);
      this.filterType = 'all';
    },
    onFilterChange(type) {
      this.filteredCities = this.getFilters(type);
      this.filterType = type;
      this.changeCenterAndZoomMap(7);
    },
  },
  computed: {
    ...mapGetters(['getSearchResult', 'getMarkers', 'getFilters', 'getShowPage']),
    ...mapState(['dataStore']),
    isNotFound() {
      return this.filteredCities && this.filteredCities.length === 0;
    },

    mapConfig() {
      return {
        ...mapSettings,
        center: this.getMarkers[0]?.position ?? {},
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  margin-top: 10px;
}

.list-block {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
}

.filters {
  &__title {
    font-size: 12px;
    line-height: 18px;
    color: #262626;
  }
  &__btn {
    cursor: pointer;
    font-size: 10px;
    letter-spacing: 0.0625em;
    border-width: 0 0 6px 0;
    border-color: transparent;
    text-transform: uppercase;
    padding: 0 0 5px;
    background-color: #fff;
    margin-right: 20px;
    transition: 0.3s;
    color: #737373;

    &:hover {
      color: #000;
      border-bottom: 6px solid #262626;
    }

    &:last-child {
      margin-right: 0;
    }
    &_active {
      border-bottom: 6px solid #262626;
      color: #000;
      outline: none;
      font-weight: bold;
    }
  }
}
</style>
