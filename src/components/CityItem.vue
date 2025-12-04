<template>
  <div class="item" :class="{ item_active: this.cityStore.activeIndex === this.index }" @click="clickOnItem()">
    <div>City name: {{ source.city }}</div>
    <div>Stores in this city: {{ source.storesLength }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

/**
 * @module CityItem
 * @description The component for a single city item.
 */
export default {
  name: 'item',
  props: {
    /**
     * The city data.
     * @type {object}
     */
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * The index of the city.
     * @type {number}
     */
    index: {
      type: Number,
    },
  },
  computed: {
    ...mapState(['cityStore']),
  },
  methods: {
    /**
     * Handles the click on the item.
     */
    clickOnItem() {
      this.$store.dispatch('getActiveIndex', this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid lightgrey;
  padding: 20px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover,
  &_active {
    background: #ededed;
  }
}
</style>
