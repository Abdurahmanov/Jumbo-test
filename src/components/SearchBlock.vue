<template>
  <div class="search-block">
    <input
      type="text"
      class="input"
      v-model="search"
      placeholder="Enter the name of the city"
      @keyup.enter="$emit('onSearch', search)"
    />
    <button class="cross" v-show="search" @click="onClear()">+</button>
    <button class="btn" @click="$emit('onSearch', search)">Search</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      search: '',
    };
  },
  computed: {
    ...mapState(['cityStore']),
  },
  watch: {
    search: function(newVal) {
      if (newVal === '') {
        this.$emit('onSearch', this.search);
      }
    },
  },
  methods: {
    onClear() {
      this.$emit('onClear');
      this.search = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  height: 40px;
  width: 100%;
  font-size: 16px;
  padding: 0 105px 0 15px;
  border: 0;
  outline: none;
  border-radius: 4px;
  background-color: #fff;
}

.search-block {
  margin-bottom: 10px;
  position: relative;
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  border: 1px solid #d3d3d3;
  border-radius: 4px;
}

.btn {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 12px;
  color: #262626;
  padding: 7px 10px;
  border: 1px solid #262626;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #262626;
    color: white;
  }
}

.cross {
  position: absolute;
  top: -9px;
  right: 75px;
  font-size: 50px;
  transform: rotate(45deg);
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
