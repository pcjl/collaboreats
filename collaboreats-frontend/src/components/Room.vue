<template>
    <div class="Room">
        <div class="Collaboreats">
            <h1 id="collab"> collabor</h1><h1 id="eats">eats </h1>
        </div>

        <div class="VoteSection">
          <h2> Vote </h2>

          <div class="card" id="vote">
              <form v-on:submit.prevent="searchApi">
                  <input class="text-field" id="restoSearch"type="text" placeholder="Search by Name, Cuisine, Location">
              </form>

              <div v-for = "res in restaurants">
                <h3 id="title">{{res.name}}</h3>
                <img id="image" src=res.url>
                <p id="rating">{{res.rating}}</p>
                <p id="category">{{res.category}}</p>
                <p id="num-reviews">{{res.numreviews}}</p>
                <p id="price">{{res.price}}</p>
                <div class ="btn" v-on:click="addToList(res)">add</div>
              </div>

          </div>

        </div>

        <div class="SearchSection">
          <h2> Add a Restaurant </h2>

          <div class="card" id="search">
              <form v-on:submit.prevent="searchApi">
                  <input class="text-field" id="restoSearch"type="text" placeholder="Search by Name, Cuisine, Location">
              </form>

              <div class="SearchResults" v-for = "res in searchResults">
                <h3 id="title">{{res.name}}</h3>
                <img id="image" src=res.url>
                <p id="rating">{{res.rating}}</p>
                <p id="category">{{res.category}}</p>
                <p id="num-reviews">{{res.numreviews}}</p>
                <p id="price">{{res.price}}</p>
                <div class ="btn" v-on:click="addToList(res)">add</div>
              </div>

          </div>
          </div>

          <!-- <button class="btn" id="searchBtn" v-on:click="searchApi">Search</button> -->

        </div>

    </div>

</template>

<script>
var restaurantsHandler = function (self, data) {
  var restaurants = data['businesses'];
  console.log(restaurants);
  self.searchResults = restaurants;

  // iterate
};

export default {
  name: 'Room',
  props: ['roomId', 'userId'],
  components:{
    "card": require("vue-card")
  },

  data () {
      return {
          restaurants: [],
          // restaurants: ['0','1'],
          searchResults: [],
      }
  },
  methods: {
      searchApi: function(){
          var self = this;
          var search = $('#restoSearch').val().trim();
          var payload = {
              term: search,
              latitude: 43.4761259,
              longitude: -80.53880979999997
          };
          $.ajax({
              url: 'http://localhost:3000/search',
              type: "POST",
              data: JSON.stringify(payload),
              processData: false,
              contentType: 'application/json',
              success: function (data) {
                restaurantsHandler(self, data);
              },
              error: function (e) {
                  console.log(e);
              }
          })
      },
      addToList: function(object){
        var self = this;
        self.restaurants.append(object);
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
.btn{font-weight: bold; color: #D10000; margin: 50px; font-size: 18px; padding: 20px 100px ; border: none; font-family: 'Avenir', Helvetica, Arial, sans-serif;border-radius: 6px;  background-color: #FFFFFF;
            box-shadow: 0 1px 25px 0 rgba(0,0,0,0.24), 0 10px 55px 0 rgba(0,0,0,0.14);}

</style>
