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
  methods: {
    clickOnItem() {
      this.$store.dispatch('getCenter', this.source.position);
      this.$store.dispatch('getListItemActiveIndex', this.index);
      this.$store.dispatch('getZoom', 15);
    },
  },
  computed: {
    ...mapState(['mapStore']),
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
