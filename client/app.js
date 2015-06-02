// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};

app.init = function(){

};

app.send = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      //if there is no data, don't do anything
      if(!data.results || !data.results.length){return;}
      console.log('chatterbox: Message sent');
      console.log(data);
      console.log(message);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

var userObjects = {};
app.fetch = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
      // userObjects = data;
      app.listFriends(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.listFriends = function(userObjects){
  var listedFriends = [];
  var bestFriends = [];
  var rooms = [];
  $("#friendsList").empty();
  $("#roomFeedLegend").text("Lobby");
  for(var i=0; i<userObjects.results.length; i++){
    if(listedFriends.indexOf(userObjects.results[i].username) === -1 && userObjects.results[i].username){
      listedFriends.push(userObjects.results[i].username);
      $("#friendsList").append("<li class='friendLI'><span class='username'>" + app.verify(userObjects.results[i].username)
        + "</span> - " + "<span class='messageText'>" + app.verify(userObjects.results[i].text) + "</span></li>");
    }
    //rooms
    if(rooms.indexOf(userObjects.results[i].roomname) === -1 && userObjects.results[i].roomname){
      rooms.push(userObjects.results[i].roomname);
      $("#roomsMenu").append("<option class='roomOption'>" + app.verify(userObjects.results[i].roomname) + "</option>");
    }
  };
  //onclick adds bestFriends
  $(".username").on("click", function(){
    if(bestFriends.indexOf(this) === -1){
      bestFriends.push(this);
      app.addFriend(this);
      $(this).css("color", "white");
    }
  });
  //also rooms
  $("#roomsMenu").change(function(){
    var selectedOption;
    $(this).find(".roomOption").each(function(){
      if(this.selected){
        selectedOption = $(this).val();
        if(selectedOption === "pick a room..any room"){
          app.fetch();
          return;
        }
        console.log(selectedOption);  //for test
        $("#roomFeedLegend").text(selectedOption);
        var clear = false;
        $(userObjects.results).each(function(){
           if(this.roomname === selectedOption){
              if(clear === false){
                 $("#friendsList").empty();
                 clear = true;
              }
              $("#friendsList").append("<li class='friendLI'><span class='username'>"
              + app.verify(this.username)
              + "</span> - " + "<span class='messageText'>" + app.verify(this.text) + "</span></li>");
           }
        /////This can be factored out because it's repetetive
        $(".username").on("click", function(){
          if(bestFriends.indexOf(this) === -1){
              bestFriends.push(this);
              app.addFriend(this);
              $(this).css("color", "white");
             }
           });
        ///////////////////////////////////////////////////////
        });
        clear = false;

      }
    });
  });
};

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  $('#chats')
    .append('<div class="message"><span class = "username">' + message.username
      +'</span><br><span class="text">' + message.text + '</span><br><span class="room">'
      + message.roomname + '</span></div>');
};

app.addRoom = function(string){
  $("#roomSelect").append("<p>" + string + "</p>");
};

app.addFriend = function(friend){
    $("#bestFriendsList").append("<li>" + $(friend).text() + "</li>")
};

app.verify = function(input){
  if(input){
    var regex = /(<([^>]+)>)/ig;
    var result = input.replace(regex, '');
    return result;
  }
};

//gets friends on load
app.fetch();

$(document).ready(function(){
//list friends button
  $("#listFriendsButton").on("click", function(){
   app.fetch();
  });
//send message button
  $("#sendMessageButton").on("click", function(){
    var messageObject = {};
    messageObject.username = $("#usernameInput").val();
    messageObject.roomname = $("#roomnameInput").val();
    messageObject.text = $("#textInput").val();
    app.send(messageObject);
    app.fetch();
  });
  // clear messages
  // $("#clearButton").on("click", function(){
  //   app.clearMessages();
  // });
});
// $("#chats").css("background-color", "orange");


















