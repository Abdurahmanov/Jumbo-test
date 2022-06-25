<template>
  <div id="app">
    <Header/>
    <div class="wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*{
  box-sizing: border-box;
}

body {
  margin: 0;
}

.wrapper {
  padding: 0 30px;
}
</style>
