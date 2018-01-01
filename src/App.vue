<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  margin-bottom:-80px;
  padding-bottom:100px;
  min-height: 100%;
  font-size: 14px;
  /* background-color: #f9f9f9; */
}
body,html{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  
}
</style>
