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
                <input class="text-field" id="nicknameCreate"type="text" placeholder = "Nickname">
                <button class="btn" id="createRoomBtn" v-on:click="createRoom()">Create</button>
            </div>

            <div class="page" id="joinRoom" v-show="filter == 'join'">
                <input class="text-field" id="nicknameJoin"type="text" placeholder = "Nickname">
                <input class="text-field" id="roomId"type="text" placeholder = "Room ID">
                <button class="btn" id="joinRoomBtn" v-on:click="joinRoom()">Join</button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Landing',
    data () {
      return {
          filter: 'create',
          response: null
        }

    },
    methods: {
        setFilter: function(name){
            this.filter = name;
        },
        getTextFieldData: function(id){
            return $("#"+id).val();
        },
        joinRoom: function(id){
            var nickname = this.getTextFieldData('nicknameJoin');

            if(nickname == ''){
                alert("Please enter your nickname before creating a room");
                return;
            }

            var roomId = this.getTextFieldData('roomId');

            if(roomId == ''){
                alert("Please enter a Room Id to enter a room");
                return;
            }

            $.ajax({
                url: 'http://localhost:3000/'+roomId,
                type: "GET",
                async: false,
                dataType: 'json',
                success: function (response) {
                    if(!response.success){
                        //throw err
                        alert("We can not find your room")
                        return;
                    }
                    window.location.replace('/#/room/'+roomId+'/'+nickname);
                }
            });

        },
        createRoom: function(){
            var nickname = this.getTextFieldData('nicknameCreate')

            if(nickname == ''){
                alert("Please enter your nickname before creating a room")
                return;
            }
            $.ajax({
                url: 'http://localhost:3000/',
                type: "POST",
                async: false,
                dataType: 'json',
                success: function (response) {
                    if(!response.success){
                        //throw err
                        alert("We apologise, we could not create a room")
                        return;
                    }

                    var roomId = response.name;
                    window.location.replace('/#/room/'+roomId+'/'+nickname);
                }
            });
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

.text-field{font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; width: 40%; border: none; display: block;padding: 10px; margin: auto; text-align: left; position: relative; border-radius: 6px;  background-color: #FFFFFF;
            box-shadow: 0 1px 25px 0 rgba(0,0,0,0.24), 0 10px 55px 0 rgba(0,0,0,0.14);}
.text-field#nickname{
    margin-top: 50px;
}
.text-field#roomId{
    margin-top:20px;
}

.btn{font-weight: bold; color: #D10000; margin: 50px; font-size: 18px; padding: 20px 100px ; border: none; font-family: 'Avenir', Helvetica, Arial, sans-serif;border-radius: 6px;  background-color: #FFFFFF;
            box-shadow: 0 1px 25px 0 rgba(0,0,0,0.24), 0 10px 55px 0 rgba(0,0,0,0.14);}
</style>
