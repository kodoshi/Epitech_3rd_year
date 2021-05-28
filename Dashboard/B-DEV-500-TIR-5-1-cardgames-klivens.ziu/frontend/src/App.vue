<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


import TopBar from "./components/TopBar/TopBar";

export default {
  name: 'app',
  components: {
    TopBar
  }
}
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    padding-top: 4em;
  }
</style>
