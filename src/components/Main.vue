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
  </div>
</template>

<script>
import Stores from './Stores';
import Cities from './Cities';
import { mapGetters } from 'vuex';
export default {
  components: {
    Stores,
    Cities,
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
      'getFilterStoresByCities'
    ]),
    getSearch() {
      return this.getSearchResult(this.search)
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
</style>
