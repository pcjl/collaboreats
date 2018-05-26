<template>
    <div class="Room">
        <h1> collaboreats </h1>
        <div class="VoteSection">
          <h2> Vote </h2>
          <div class="VoteRestaurants">

          </div>
        </div>
        
        <div class="SearchSection">
          <h2> Add a Restaurant </h2>
        </div>

    </div>

</template>

<script>
export default {
  name: 'Room',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 { display:inline; font-weight: normal; font-size: 48px; color:#D10000;}
ul { list-style-type: none; padding: 0;}
li {display: inline-block; margin: 0 10px; }
a { color: #42b983;}
</style>
