<template>
    <div class="Landing">
        <div class="Collaboreats">
            <h1 id="collab"> collabor</h1><h1 id="eats">eats </h1>
        </div>
        <div class="login">
            <div id="landingFilterBar">
                <ul>
                    <li :class="{active : filter == 'create'}" v-on:click="setFilter('create')"><a href="#">Create</a></li>
                    <li :class="{active : filter == 'join'}" v-on:click="setFilter('join')"><a href="#">Join</a></li>
                </ul>
            </div>
            <div class="page" id="createRoom" v-show="filter == 'create'">
                <input class="text-field" id="nickname"type="text"placeholder = "nickname">
                <button class="btn" id="createRoomBtn">Create</button> 
            </div>

            <div class="page" id="joinRoom" v-show="filter == 'join'">
                <input class="text-field" id="nickname"type="text" placeholder = "nickname">
                <input class="text-field" id="roomId"type="text" placeholder = "room ID">
                <button class="btn" id="joinRoomBtn">Join</button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Landing',
    data () {
      return {
          filter: 'create'
        }

    },
    methods: {
        setFilter: function(name){
            this.filter = name;
        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Collaboreats h1{display: inline; font-size: 144px; font-weight: normal;}
.Collaboreats #collab{color: #8C8C8C}
.Collaboreats #eats{color: #D10000}
.login #landingFilterBar ul {padding: 0;}
.login #landingFilterBar li { display: inline; top:4px; margin:0 5%; cursor:pointer;}
.login #landingFilterBar li a{text-decoration: none; color: #D10000; font-size: 36px;}
.login #landingFilterBar li.active { font-weight: 600; border-bottom: 3px solid #D10000; }

.text-field{font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; width: 40%; border: none; display: block; padding: 10px; margin: auto; text-align: left; position: relative; border-radius: 6px;  background-color: #FFFFFF;
            box-shadow: 0 1px 25px 0 rgba(0,0,0,0.24), 0 10px 55px 0 rgba(0,0,0,0.14);}

input::placeholder{

}

</style>
