<template>
    <div id="app">
        <Room/>
    </div>
</template>
<script>
import Room from './components/Room'
import Landing from './components/Landing'

export default {
    name: 'App',
    components: {
        Landing, Room
    }
}
</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    text-align: center;

}
html {background-color: #FAF4F1;}
</style>
