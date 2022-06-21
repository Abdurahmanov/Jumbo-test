<template>
  <div>
    <ul>
      <li v-for="store in getStoresName" :key="store">{{ store }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stores: [
        { uuid: 123, addressName: "Store 1" },
        { uuid: 456, addressName: "Store 2" },
      ],
    };
  },
  computed:{
    getStoresName() {
      return this.$store.getters.getStores
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

li {
  display: inline-block;
  background: #fdc513;
  margin: 5px;
}
</style>
