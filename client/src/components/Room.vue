<template>
    <div class="Room">
        <div class="Collaboreats">
            <h1 id="collab"> collabor</h1>
            <h1 id="eats">eats </h1>
        </div>
        <div class="VoteSection" v-cloak>
            <h2> Vote </h2>
            <div class="emptyList" v-if="emptyRestaurantList">
                <h2> Add restaurants to the list by using the search bar below...</h2>
            </div>
            <div class="card" id="vote">
                <div class="VoteRestaurants"v-for="res in orderedRestaurants">
                  <div class="container">
                    <img id="image" :src="res.image_url" alt = N/A>
                    <a :href="res.url"><h3 id="title">{{res.name}}</h3></a>
                    <p id="rating"></p>
                    <p id="num-reviews">Rating: {{res.rating}} <br> {{res.review_count}} Reviews<br>Price: {{res.price}}</p>
                    <h3 id="vote-num">{{res.votes.length}}</h3>
                    <button :class="{unvote : userInArray(res) == true}" v-on:click="submitVote(res)">{{userInArray(res) ? '- vote' : '+ vote'}}</button>
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
                        <img id="image" :src="res.image_url" alt = N/A>
                        <a :href="res.url"><h3 id="title">{{res.name}} </h3></a>
                        <p id="rating"></p>
                        <p id="num-reviews">Rating: {{res.rating}} <br> {{res.review_count}} Reviews<br>Price: {{res.price}}</p>
                        <button class="btn" v-on:click="addToList(res)">add</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <button class="btn" id="searchBtn" v-on:click="searchApi">Search</button> -->
        <div class="footer">
            <h3 id="roomIdText">Room Id: </h3><h3 id="roomIdValue">{{roomId}}</h3>
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
            function compare(a, b) {
                if (a.votes.length < b.votes.length)
                    return  1;
                if (a.votes.length > b.votes.length)
                    return -1;
                return 0;
            }


            return this.restaurants.sort(compare);
        },
        emptyRestaurantList: function(){
            return this.restaurants.length > 0 || !this.pageReady ? false : true;
        }

    },

    data () {
        return {
            restaurants: [],
            searchResults: [],
            pageReady: false

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
                url: 'http://localhost:3000/api/search',
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
            object['votes'] = [this.userId];

            self.restaurants.push(object);
          }
          var payload = {
              restaurant: object.id,
              vote: this.userId,
              unvote: false
          }
          console.log(payload);
          $.ajax({
              url: 'http://localhost:3000/api/rooms/' + this.roomId,
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
          var self = this;
          var payload = {
              restaurant: object.id,
              vote: this.userId,
              unvote: this.userInArray(object)
          }
          console.log(payload);
          $.ajax({
              url: 'http://localhost:3000/api/rooms/' + this.roomId,
              type: "PUT",
              data: JSON.stringify(payload),
              processData: false,
              contentType: 'application/json',
              success: function (data) {
                  self.flipUserInArray(object);
                  return;
              },
              error: function (e) {
                  console.log(e);
              }
          })
      },
      userInArray: function(res){
          return res['votes'].indexOf(this.userId) >= 0;
      },
      flipUserInArray: function(res) {
          var index = res['votes'].indexOf(this.userId);
          if (index >= 0) {
            res['votes'].splice(index, 1);
          } else {
            res['votes'].push(this.userId);
          }
          return;
      }
    },
    mounted: function(){
        var self = this;
        $.ajax({
            url: 'http://localhost:3000/api/rooms/' + self.roomId,
            type: "GET",
            processData: false,
            contentType: 'application/json',
            success: function (data) {
                var restaurants = data['room']['restaurants'];
                if(restaurants.length == 0) self.pageReady = true;
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
                    url: 'http://localhost:3000/api/search/ids',
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
                        self.pageReady = true;
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
    box-sizing: border-box;
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
    margin-left: 5%;
    margin-right: 5%;
}

h3 {
    font-size: 20px;
    width: 200px;
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
.unvote{
    cursor: pointer;
    font-weight: bold;
    color: #D10000;
    background-color: #FFFFFF;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border-radius: 6px;
    border: solid;
}
.unvote:hover{
    color: #FFFFFF;
    background-color: #D10000;
}

button {
    cursor: pointer;
    font-weight: bold;
    color: #FFFFFF;
    background: #D10000;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border-radius: 6px;
    border: solid;
}

button:hover {
    color: #D10000;
    background-color: #FFFFFF;
}

/* <div class="footer">
    <h3 id="roomIdText">Room Id: </h3><h3 id="roomIdValue">{{roomId}}</h3>
</div> */
.emptyList{
    text-align: center;
    margin: 32px 303px 124px;
}
.emptyList h2{
    color: #8C8c8C;
}

.footer{
    margin: 50px 0px;
}

.footer h3{
    display: inline;
    text-align: center;
}

.footer #roomIdText{
    color: #8C8C8C;
}
.footer #roomIdValue{
    color: #D10000;
}

[v-cloak] { display:none; }

</style>
