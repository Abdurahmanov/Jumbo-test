<template>
  <div class="wrapper">
    <div v-if="item">
      <div class="table__block">
        <table>
          <thead>
            <tr>
              <th>Address name</th>
              <th>City name</th>
              <th>Open on Sunday</th>
              <th>Time open</th>
              <th>Time close</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in item.stores" :key="store.id">
              <td>{{ store.addressName }}</td>
              <td>{{ item.city }}</td>
              <td>{{ store.sundayOpen ? 'Yes' : 'No' }}</td>
              <td>{{ store.todayOpen }}</td>
              <td>{{ store.todayClose }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="empty">
      <p>
        Please click on the item on the left
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 70%;
}

.empty {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  padding: 10px 0;
  text-align: center;
}

tr {
  border-bottom: 1px solid lightgrey;
}

.table {
  &__block {
    height: 500px;
    overflow-y: auto;
  }
}
</style>
