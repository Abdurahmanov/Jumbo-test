<template>
  <div class="list-block">
    <virtual-list
      class="list"
      ref="list"
      style="min-height: 85px; overflow-y: auto; max-height: 500px"
      :data-key="'city'"
      :data-sources="list"
      :data-component="item"
      :estimate-size="85"
      v-if="!isNotFound"
    />
    <div v-else>
      <p>
        Not Found
      </p>
    </div>
  </div>
</template>

<script>
import Item from '@/components/CityItem';
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    isNotFound: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      item: Item,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-block {
  width: 30%;
  border-right: 1px solid lightgrey;
}
</style>
