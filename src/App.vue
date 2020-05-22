<template>
  <div id="app">
  <!-- <div>APP</div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeRouteEnter (to, from, next) {
    // ...
    console.log(to)
    console.log(from)
    debugger
    next();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
