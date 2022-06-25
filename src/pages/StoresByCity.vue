<template>
  <div class="">
    <div class="block" v-if="!this.dataStore.isLoading">
      <CityList :list="getCitiesName" isNotFound="false" />
      <TableStores :item="getCitiesName[this.cityStore.activeIndex]" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import CityList from '@/components/CityList';
import TableStores from '@/components/TableStores';
import { mapState } from 'vuex';
export default {
  components: {
    CityList,
    TableStores,
  },
  data() {
    return {
      filteredCities: [],
    };
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  methods: {},
  computed: {
    ...mapState(['dataStore', 'cityStore']),
    getCitiesName() {
      return this.$store.getters.getUniqCities;
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  display: flex;
}
</style>
