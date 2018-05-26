<template>
    <div class="Room">
        <div class="Collaboreats">
            <h1 id="collab"> collabor</h1>
            <h1 id="eats">eats </h1>
        </div>
        <div class="VoteSection">
            <h2> Vote </h2>
            <div class="card" id="vote">
                <div class="VoteRestaurants"v-for="res in restaurants">
                  <div class="container">
                    <a :href="res.url"><h3 id="title">{{res.name}}</h3></a>
                        <img id="image" :src="res.image_url" alt = N/A>
                        <p id="rating"></p>
                        <p id="num-reviews">Rating: {{res.rating}} <br> {{res.review_count}} Reviews<br>Price: {{res.price}}</p>
                        <h3 id="vote-num">{{res.votes.length}}</h3>
                    <button class="vote" v-on:click="submitVote(res)">+ vote</button>

                  </div>
                </div>
            </div>
        </div>
        <div class="SearchSection">
            <h2> Add a Restaurant </h2>
            <div class="card" id="search">
                <form v-on:submit.prevent="searchApi">
                    <input class="text-field" id="restoSearch" type="text" placeholder="Search by Name, Cuisine, Location">
                </form>
                <div class="SearchResults" v-for="res in searchResults">
                    <div class="container">
                        <a :href="res.url"><h3 id="title">{{res.name}} </h3></a>
                        <img id="image" :src="res.image_url" alt = N/A>
                        <p id="rating"></p>
                        <p id="num-reviews">Rating: {{res.rating}} <br> {{res.review_count}} Reviews<br>Price: {{res.price}}</p>
                        <button class="btn" v-on:click="addToList(res)">add</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <button class="btn" id="searchBtn" v-on:click="searchApi">Search</button> -->
    </div>
    </div>
</template>
<script>
var restaurantsHandler = function(self, data) {
    var restaurants = data['businesses'];
    console.log(restaurants);
    self.searchResults = restaurants;
    // iterate
};

export default {
    name: 'Room',
    props: ['roomId', 'userId'],
    components: {
        "card": require("vue-card")
    },
    computed: {
        orderedRestaurants: function(){
            // return _.orderby(this.restaurants, '')
        }

    },

    data () {
        return {
            restaurants: [],
            searchResults: []
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
          var matching_restaurant = self.restaurants.find(function (restaurant) {
              return restaurant['id'] == object['id'];
          });
          if (matching_restaurant == null) {
            self.restaurants.push(object);
          }
          var payload = {
              restaurant: object.id,
              vote: this.userId,
              unvote: false
          }
          console.log(payload);
          $.ajax({
              url: 'http://localhost:3000/' + this.roomId,
              type: "PUT",
              data: JSON.stringify(payload),
              processData: false,
              contentType: 'application/json',
              success: function (data) {
                  return;
              },
              error: function (e) {
                  console.log(e);
              }
          })
      },

      submitVote: function(object){
          var payload = {
              restaurant: object.id,
              vote: this.userId,
              unvote: false
          }
          console.log(payload);
          $.ajax({
              url: 'http://localhost:3000/' + this.roomId,
              type: "PUT",
              data: JSON.stringify(payload),
              processData: false,
              contentType: 'application/json',
              success: function (data) {
                  return;
              },
              error: function (e) {
                  console.log(e);
              }
          })
      }
    },
    mounted: function(){
        var self = this;
        $.ajax({
            url: 'http://localhost:3000/' + self.roomId,
            type: "GET",
            processData: false,
            contentType: 'application/json',
            success: function (data) {
                var restaurants = data['room']['restaurants'];
                var votes = {};

                var i;
                for(i = 0; i < restaurants.length; i++) {
                    votes[restaurants[i]['name']] = restaurants[i]['votes'];
                }

                var restaurant_ids = [];

                for(i = 0; i < restaurants.length; i++) {
                    restaurant_ids.push(restaurants[i]['name']);
                }
                var payload = {
                    'restaurants': restaurant_ids
                };
                $.ajax({
                    url: 'http://localhost:3000/search/ids',
                    type: "POST",
                    data: JSON.stringify(payload),
                    processData: false,
                    contentType: 'application/json',
                    success: function (data) {
                        var restaurantDetails = data['businesses'];
                        for(i = 0; i < restaurantDetails.length; i++) {
                            restaurantDetails[i]['votes'] = votes[restaurantDetails[i]['id']];
                        }
                        self.restaurants = restaurantDetails;
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            },
            error: function (e) {
                console.log(e);
            }
        });
    },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Collaboreats h1 {
    display: inline;
    font-size: 72px;
    font-weight: normal;
}

.Collaboreats #collab {
    color: #8C8C8C;
}
.Collaboreats #eats {
    color: #D10000;
}

.text-field {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 18px;
    width: 100%;
    border: none;
    display: block;
    padding: 5px;
    margin: auto;
    text-align: left;
    position: relative;
    border-radius: 6px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, 0.24), 0 10px 55px 0 rgba(0, 0, 0, 0.14);
}

h2 {
    font-weight: normal;
    font-size: 48px;
    color: #D10000;
    text-align: left;
    margin: 20px;
}

h3 {
    font-size: 20px;
    width: 100px;
    color: #D10000;
}

h3#vote-num{
  text-align: right;
  color: #D10000;
}

p {
    font-weight: normal;
}

.container {
    padding: 20px;
    width: 90%;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
}

.card {
    margin-left: 5%;
    margin-right: 5%;
    text-align: left;
    position: relative;
    border-radius: 6px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, 0.24), 0 10px 55px 0 rgba(0, 0, 0, 0.14);
}

img{
  object-fit: cover;
  width: 100px;
  height: 100px;
}

a:link{
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  text-decoration-color: #D10000;
}
.vote{
    cursor: pointer;
    font-weight: bold;
    color: #D10000;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border-radius: 6px;
    border: solid;
}

button {
    cursor: pointer;
    font-weight: bold;
    color: #D10000;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border-radius: 6px;
    border: solid;
}

button:hover {
    color: #FFFFFF;
    background-color: #D10000;
}
</style>
