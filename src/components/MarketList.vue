<template>
  <div class="list-block">
    <virtual-list
        class="list"
        ref="list"
        style="min-height: 112px; overflow-y: auto; max-height: 360px"
        :data-key="'id'"
        :data-sources="getSearch"
        :data-component="item"
        :estimate-size="105"
    />
  </div>
</template>

<script>
  import Item from './MarketItem'
  import {mapGetters} from "vuex";

  export default {
    props: {
      getSearch: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        item: Item,
      }
    },
    computed: {
      ...mapGetters([
        'getMarkers',
      ]),
    },
    mounted() {
      this.$store.dispatch('getListRef', this.$refs.list);
    },
  }
</script>

<style lang="scss" scoped>
  .list-block {
    position: absolute;
    top: 20px;
    background: white;
    left: 20px;
    width: 350px;
    box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  }
</style>