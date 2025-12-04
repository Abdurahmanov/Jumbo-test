<template>
  <div class="item" :class="{ item_active: this.mapStore.listItemActiveIndex === this.index }" @click="clickOnItem()">
    <div class="item__img">
      <img :src="imgSource" alt="marker" />
    </div>
    <div class="item__info">
      <div class="item__title">{{ source.addressName }}</div>
      <div class="item__description">{{ source.street }} {{ source.street2 }}</div>
      <div class="item__description">{{ source.city }}</div>
      <div class="item__description">Opening hours: {{ source.todayOpen }}-{{ source.todayClose }}</div>
    </div>
  </div>
</template>

<script>
import pin from '@/assets/pin.webp';
import pinNew from '@/assets/pinNew.webp';
import { mapState, mapActions } from 'vuex';

/**
 * @module StoreItem
 * @description The component for a single store item.
 */
export default {
  name: 'item',
  props: {
    /**
     * The store data.
     * @type {object}
     */
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * The index of the store.
     * @type {number}
     */
    index: {
      type: Number,
    },
  },
  methods: {
    ...mapActions(['getCenter', 'getListItemActiveIndex', 'getZoom']),
    /**
     * Handles the click on the item.
     */
    clickOnItem() {
      this.getCenter(this.source.position);
      this.getListItemActiveIndex(this.index);
      this.getZoom(15);
    },
  },
  computed: {
    ...mapState(['mapStore']),
    /**
     * The image source for the marker.
     * @returns {string}
     */
    imgSource() {
      return this.source.newStore !== 0 ? pinNew : pin;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  border-bottom: 1px solid lightgrey;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover,
  &_active {
    background: #ededed;
  }

  &__img {
    margin-right: 10px;
    width: 30px;

    & img {
      display: block;
      width: 100%;
    }
  }

  &__description {
    font-size: 12px;
  }
}
</style>
