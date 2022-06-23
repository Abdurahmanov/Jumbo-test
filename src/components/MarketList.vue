<template>
  <div class="list-block">
    <virtual-list
        class="list"
        ref="list"
        style="height: 360px; overflow-y: auto;"
        :data-key="'id'"
        :data-sources="getMarkers"
        :data-component="item"
        :estimate-size="105"
    />
  </div>
</template>

<script>
  import Item from './MarketItem'
  import {mapGetters} from "vuex";

  export default {
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
  }
</style>