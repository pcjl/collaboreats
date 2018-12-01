<template>
  <div class="Home">
    <div class="Collaboreats">
      <h1 id="collab"> collabor</h1>
      <h1 id="eats">eats </h1>
    </div>
    <div class="login">
      <div id="landingFilterBar">
        <ul>
          <li :class="{active : filter == 'create'}" v-on:click="setFilter('create')">
            <a href="#">Create</a>
          </li>
          <li :class="{active : filter == 'join'}" v-on:click="setFilter('join')">
            <a href="#">Join</a>
          </li>
        </ul>
      </div>

      <div class="page" id="createRoom" v-show="filter == 'create'">
        <form v-on:submit.prevent="createRoom">
          <input class="text-field" id="nicknameCreate" type="text" placeholder="Nickname">
          <button type="submit" class="btn" id="createRoomBtn">Create</button>
        </form>
      </div>

      <div class="page" id="joinRoom" v-show="filter == 'join'">
        <form v-on:submit.prevent="joinRoom">
          <input class="text-field" id="nicknameJoin" type="text" placeholder="Nickname">
          <input class="text-field" id="roomId" type="text" placeholder="Room ID">
          <button type="submit" class="btn" id="joinRoomBtn">Join</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        filter: 'create',
        response: null
      }
    },
    methods: {
      setFilter: function (name) {
        this.filter = name;
      },
      getTextFieldData: function (id) {
        return $("#" + id).val();
      },
      joinRoom: function (id) {
        var nickname = this.getTextFieldData('nicknameJoin');

        if (nickname == '') {
          alert("Please enter a nickname before joining a room");
          return false;
        }

        var roomId = this.getTextFieldData('roomId');

        if (roomId == '') {
          alert("Please enter a room ID before joining a room");
          return false;
        }

        $.ajax({
          url: 'http://localhost:3000/api/rooms/' + roomId,
          type: "GET",
          async: false,
          dataType: 'json',
          success: function (response) {
            if (!response.success) {
              alert("Error: Could not join room");
              return false;
            }

            window.location.replace('/#/room/' + roomId + '/' + nickname);
            return false;
          },
          error: function (e) {
            alert("Error: " + e.responseText);
            return false;
          }
        });

      },
      createRoom: function () {
        var nickname = this.getTextFieldData('nicknameCreate')

        if (nickname == '') {
          alert("Please enter a nickname before creating a room");
          return false;
        }

        $.ajax({
          url: 'http://localhost:3000/api/rooms/',
          type: "POST",
          async: false,
          dataType: 'json',
          success: function (response) {
            if (!response.success) {
              alert("Error: Could not create room");
              return false;
            }

            var roomId = response.name;
            window.location.replace('/#/room/' + roomId + '/' + nickname);
            return false;
          },
          error: function (e) {
            alert("Error: " + e.responseText);
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .Collaboreats h1 {
    display: inline;
    font-size: 144px;
    font-weight: normal;
  }

  .Collaboreats #collab {
    color: #8C8C8C
  }

  .Collaboreats #eats {
    color: #D10000
  }

  .login #landingFilterBar ul {
    padding: 0;
  }

  .login #landingFilterBar li {
    display: inline;
    top: 4px;
    margin: 0 5%;
    cursor: pointer;
  }

  .login #landingFilterBar li a {
    text-decoration: none;
    color: #D10000;
    font-size: 36px;
  }

  .login #landingFilterBar li.active {
    font-weight: 600;
    border-bottom: 3px solid #D10000;
  }

  .text-field {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 18px;
    width: 40%;
    border: none;
    display: block;
    padding: 10px;
    margin: auto;
    text-align: left;
    position: relative;
    border-radius: 6px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, 0.24), 0 10px 55px 0 rgba(0, 0, 0, 0.14);
  }

  .text-field#nickname {
    margin-top: 50px;
  }

  .text-field#roomId {
    margin-top: 20px;
  }

  .btn {
    font-weight: bold;
    color: #D10000;
    margin: 50px;
    font-size: 18px;
    padding: 20px 100px;
    border: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border-radius: 6px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, 0.24), 0 10px 55px 0 rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
</style>
