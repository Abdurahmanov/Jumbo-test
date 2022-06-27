<template>
  <div class="search-block" v-click-outside="clickOutside">
    <input
      type="text"
      class="input"
      v-model="search"
      placeholder="Enter the name of the city"
      @keyup.enter="onSearch()"
      @focus="onFocus()"
    />
    <button class="cross" v-show="search" @click="onClear()">+</button>
    <button class="btn" @click="onSearch()">Search</button>
    <div class="suggestion__block" v-show="isFocus" :class="{ suggestion__block_loading: getSearchedLoading }">
      <div v-if="dataStore.searchedData.length">
        <div
          class="suggestion__item"
          v-for="item in dataStore.searchedData"
          :key="item"
          @click="onClickSuggestion(item)"
        >
          {{ item }}
          <button class="cross cross_small" @click.stop="onRemoveSearchedItem(item)">+</button>
        </div>
      </div>
      <div class="suggestion__empty" v-else>
        <p>Do a search and the city will be added</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      search: '',
      isFocus: false,
    };
  },
  computed: {
    ...mapState(['dataStore']),
    ...mapGetters(['getUniqueSearchedCities', 'getFilteredSearchedData', 'getSearchedLoading']),
  },
  mounted() {
    this.$store.dispatch('getSearchedData');
  },
  watch: {
    search: function(newVal) {
      if (newVal === '') {
        this.$emit('onSearch', this.search);
      }
    },
  },
  methods: {
    ...mapActions(['updateSearchedData', 'removeSearchedDataItem']),
    onClear() {
      this.$emit('onClear');
      this.search = '';
    },
    onClickSuggestion(item) {
      this.search = item;
      this.onSearch();
    },
    onSearch() {
      this.isFocus = false;
      this.$emit('onSearch', this.search);
      this.updateSearchedData(this.getUniqueSearchedCities(this.search));
    },
    clickOutside() {
      this.isFocus = false;
    },
    onFocus() {
      this.isFocus = true;
    },
    onRemoveSearchedItem(item) {
      this.removeSearchedDataItem(this.getFilteredSearchedData(item));
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

  &_small {
    font-size: 30px;
    top: 8px;
    right: 10px;
  }
}

.suggestion {
  &__block {
    position: absolute;
    width: 100%;
    background: white;
    overflow-y: auto;
    min-height: 50px;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    max-height: 200px;

    &_loading {
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.5);
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  &__item {
    padding: 15px;
    font-size: 16px;
    color: rgb(0, 0, 0, 0.8);
    cursor: pointer;
    transition: 0.3s;
    border-bottom: 1px solid #d3d3d3;
    position: relative;

    &:last-child {
      border: none;
    }

    &:hover {
      color: rgb(0, 0, 0, 1);
    }
  }

  &__empty {
    font-size: 16px;
    color: rgb(0, 0, 0, 0.8);
    padding: 15px;
  }
}
</style>
