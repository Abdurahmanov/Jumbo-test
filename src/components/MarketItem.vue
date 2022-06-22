<template>
  <div class="item"  @click="clickOnItem()">
    <div class="item__img">
      <img src="https://www.jumbo.com/INTERSHOP/static/WFS/Jumbo-Grocery-Site/-/-/nl_NL/images/pin-pup-store-active-icon.png" alt="marker">
    </div>
    <div class="item__info">
      <div class="item__title">{{source.addressName}}</div>
      <div class="item__description">{{source.street}} {{source.street2}}</div>
      <div class="item__description">{{source.city}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'item',
  props: {
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
    }
  },
  methods: {
    clickOnItem() {
      this.getCenter(this.index);
      this.getZoom(10)
    }
  },
  computed: {
    ...mapGetters([
      'getCenter',
      'getZoom',
    ]),
  }
}
</script>

<style  lang="scss">
.item {
  display: flex;
  border-bottom: 1px solid lightgrey;
  padding: 20px;

  &__img {
    margin-right: 10px;

    & img {
      display: block;
    }
  }

  &__description {
    font-size:12px;
  }
}
</style>
