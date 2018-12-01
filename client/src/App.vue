<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home'
import Room from './components/Room'

export default {
  name: 'App',
  components: {
    Home,
    Room
  }
}
</script>

<style>
  html {
    background-color: #FAF4F1;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
