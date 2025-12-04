<template>
  <div v-if="getShowPage">
    <SearchBlock @onSearch="onSearch($event)" @onClear="onClear()"></SearchBlock>
    <div class="block">
      <CityList :list="filteredCities ? filteredCities : getUniqCities" :isNotFound="isNotFound" />
      <TableStores
        :item="filteredCities ? filteredCities[this.cityStore.activeIndex] : getUniqCities[this.cityStore.activeIndex]"
      />
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
import CityList from '@/components/CityList';
import TableStores from '@/components/TableStores';
import SearchBlock from '@/components/SearchBlock';
import { mapGetters, mapState } from 'vuex';
/**
 * @module StoresByCity
 * @description The page that displays the stores by city.
 */
export default {
  components: {
    CityList,
    TableStores,
    SearchBlock,
  },
  data() {
    return {
      /**
       * The filtered cities.
       * @type {Array}
       */
      filteredCities: undefined,
    };
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  methods: {
    /**
     * Searches for a city.
     * @param {string} str The search string.
     */
    onSearch(str) {
      this.filteredCities = this.getCitySearchResult(str);
    },
    /**
     * Clears the search.
     */
    onClear() {},
  },
  computed: {
    ...mapState(['dataStore', 'cityStore']),
    ...mapGetters(['getUniqCities', 'getCitySearchResult', 'getShowPage']),
    /**
     * Whether the search result is not found.
     * @returns {boolean}
     */
    isNotFound() {
      return this.filteredCities && this.filteredCities.length === 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  display: flex;
}
</style>
