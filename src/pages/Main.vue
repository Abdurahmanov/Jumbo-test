<template>
  <div>
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
    <div class="map" v-if="!this.dataStore.isLoading">
      <GoogleMapLoader :mapConfig="mapConfig" apiKey="">
        <template v-slot="{ google, map }">
          <GoogleMapMarker
            v-for="(marker, index) in filteredCities ? filteredCities : getMarkers"
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
          <input
            type="text"
            class="input"
            v-model="search"
            placeholder="Enter the name of the city"
            @keyup.enter="onSearch()"
          />
          <button class="cross" v-show="search" @click="onClear()">+</button>
          <button class="btn" @click="onSearch()">Search</button>
        </div>
        <MarketList :getSearch="filteredCities ? filteredCities : getMarkers" :isNotFound="isNotFound" />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import GoogleMapLoader from '@/components/GoogleMapLoader';
import GoogleMapMarker from '@/components/GoogleMapMarker';
import MarketList from '@/components/MarketList';

import { mapSettings } from '@/constants/mapSettings';
import { filters } from '@/constants/filters';
export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    MarketList,
  },
  data() {
    return {
      search: '',
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
    onSearch() {
      this.filteredCities = this.getSearchResult(this.search);
      this.filterType = 'all';
      if (!this.isNotFound) {
        this.changeCenterAndZoomMap();
      }
    },
    onClear() {
      this.search = '';
      this.changeCenterAndZoomMap(7);
      this.filterType = 'all';
    },
    onFilterChange(type) {
      this.filteredCities = this.getFilters(type);
      this.filterType = type;
    },
  },
  watch: {
    search: function(newVal) {
      if (newVal === '') {
        this.onSearch();
      }
    },
  },
  computed: {
    ...mapGetters(['getSearchResult', 'getMarkers', 'getFilters']),
    ...mapState(['dataStore']),
    isNotFound() {
      return this.filteredCities && this.filteredCities.length === 0;
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

<style lang="scss">
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
