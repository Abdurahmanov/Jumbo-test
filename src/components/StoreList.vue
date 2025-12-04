<template>
  <div class="list__wrapper">
    <virtual-list
      class="list"
      ref="list"
      style="min-height: 112px; overflow-y: auto; max-height: 360px"
      :data-key="'uuid'"
      :data-sources="getSearch"
      :data-component="item"
      :estimate-size="105"
      v-if="!isNotFound"
    />
    <div v-else class="notFound">
      <p>
        Not Found
      </p>
    </div>
  </div>
</template>

<script>
import Item from './StoreItem';
import { mapGetters } from 'vuex';

/**
 * @module StoreList
 * @description The component for the list of stores.
 */
export default {
  props: {
    /**
     * The list of stores.
     * @type {Array}
     */
    getSearch: {
      type: Array,
      required: true,
    },
    /**
     * Whether the search result is not found.
     * @type {boolean}
     */
    isNotFound: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      /**
       * The store item component.
       * @type {object}
       */
      item: Item,
    };
  },
  computed: {
    ...mapGetters(['getMarkers']),
  },
  mounted() {
    this.$store.dispatch('getListRef', this.$refs.list);
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__wrapper {
    background: white;
    box-shadow: 0 0 15px rgb(0 0 0 / 25%);
    border-radius: 4px;
  }
}

.notFound {
  padding: 20px;
}
</style>
