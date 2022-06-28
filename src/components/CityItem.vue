<template>
  <div class="item" :class="{ item_active: this.cityStore.activeIndex === this.index }" @click="clickOnItem()">
    <div>City name: {{ source.city }}</div>
    <div>Stores in this city: {{ source.storesLength }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'item',
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
    },
  },
  computed: {
    ...mapState(['cityStore']),
  },
  methods: {
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
