<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
import Home from "./views/Home/Home";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>
<style lang="scss">
@import "./assets/scss/base.scss";
</style>
