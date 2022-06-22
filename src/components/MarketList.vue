<template>
  <div class="list-block">
    <virtual-list
        class="list"
        style="height: 360px; overflow-y: auto;"
        :data-key="'id'"
        :data-sources="this.getMarkers"
        :data-component="item"
        :estimate-size="50"
    />
  </div>
</template>

<script>
  import Item from './MarketItem'
  import {mapGetters} from "vuex";

  export default {
    name: 'App',
    data() {
      return {
        item: Item,
      }
    },
    computed: {
      ...mapGetters([
        'getMarkers',
      ]),
    }
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