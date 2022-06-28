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
export default {
  components: {
    CityList,
    TableStores,
    SearchBlock,
  },
  data() {
    return {
      filteredCities: undefined,
    };
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  methods: {
    onSearch(str) {
      this.filteredCities = this.getCitySearchResult(str);
    },
    onClear() {},
  },
  computed: {
    ...mapState(['dataStore', 'cityStore']),
    ...mapGetters(['getUniqCities', 'getCitySearchResult', 'getShowPage']),
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
