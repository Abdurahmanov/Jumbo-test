<template>
  <div>
    <ul>
      <li v-for="city in getCitiesName" :key="city" @click="clickOnCity(city)">{{ city }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: ["Amsterdam", "Veghel"],
      filteredCities: [],
    };
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

<style lang="scss" scoped>
ul {
  list-style: none;
}

li {
  display: inline-block;
  background: #fdc513;
  margin: 5px;
}
</style>
