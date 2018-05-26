<template>
    <div class="Room">
        <div class="Collaboreats">
            <h1 id="collab"> collabor</h1><h1 id="eats">eats </h1>
        </div>

        <div class="VoteSection">
          <h2> Vote </h2>

          <div class="card" id="vote">
            content
          </div>

        </div>

        <div class="SearchSection">
          <h2> Add a Restaurant </h2>

          <div class="card" id="search">
            <input class="text-field" id="restoSearch"type="text">
          </div>

        </div>

    </div>

</template>

<script>
export default {
  name: 'Room',
  props: ['roomId', 'userId'],
  components:{
    "card": require("vue-card")
  },
  computed: function(){
  },

  data () {
      return {
          restaurants: null,
          searchresults: null,
          autocompleteresults: null
      }
  },
  methods: {

      autoCompleteApi: function(){
          var search = $('#restoSearch').val();
          $.ajax({
              url: 'https://api.yelp.com/v3/autocomplete',
              type: "GET",
              async: false,
              dataType: 'json',
              data: {
                  text: search,
                  latitude: 43.464,
                  longitude: 80.520
              },
              success: function (response) {
                  businesses = response.businesses;

              }
          });

      }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Collaboreats h1{display: inline; font-size: 72px; font-weight: normal;}
.Collaboreats #collab{color: #8C8C8C}
.Collaboreats #eats{color: #D10000}
.text-field{font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; width: 100%; border: none; display: block;padding: 5px; margin: auto; text-align: left; position: relative; border-radius: 6px;  background-color: #FFFFFF;
            box-shadow: 0 1px 25px 0 rgba(0,0,0,0.24), 0 10px 55px 0 rgba(0,0,0,0.14);}
h2 { font-weight: normal; font-size: 48px; color:#D10000; text-align: left; margin: 20px;}

p {font-weight: normal;}

.card {margin-left:5%; margin-right: 5%; text-align: left; position: relative; border-radius: 6px;  background-color: #FFFFFF;  box-shadow: 0 1px 25px 0 rgba(0,0,0,0.24), 0 10px 55px 0 rgba(0,0,0,0.14);}

</style>
