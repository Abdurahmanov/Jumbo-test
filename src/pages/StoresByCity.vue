<template>
  <div>
    <virtual-list
        class="list"
        ref="list"
        style="min-height: 112px; overflow-y: auto; max-height: 360px"
        :data-key="'id'"
        :data-sources="getSearch"
        :data-component="item"
        :estimate-size="105"
        v-if="!isNotFound"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filteredCities: [],
    };
  },
  mounted() {
    this.$store.dispatch('getData');
  },
  methods: {
    clickOnCity(city) {
      this.filteredCities = this.$store.getters.getFilterStoresByCities(city)
    }
  },
  computed:{
    getCitiesName() {
      return this.$store.getters.getCities
    }
  },
};
</script>