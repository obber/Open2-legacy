(function() {

  angular 
    .module('myApp')
    // login controller
    .controller('chatCtrl', function($scope) { 

      $scope.username = localStorage.username;

      // REGISTER DOM ELEMENTS
      console.log('registering');
      var messageField = $('#messageInput');
      var messageList = $('#example-messages');

      // LISTEN FOR KEYPRESS EVENT
      messageField.keypress(function (e) {
        if (e.keyCode == 13) {
          //FIELD VALUES
          var username = localStorage.username;
          var message = messageField.val();   

          //SAVE DATA TO FIREBASE AND EMPTY FIELD
          var timeString = Date.parse(new Date()).toString();
          console.log('timeString =', timeString);
          console.log('yo');
          ref.push({name:username, text:message, time: timeString });
          messageField.val('');
        }
      });
      
      // Add a callback that is triggered for each chat message.
      ref.limitToLast(10).on('child_added', function (snapshot) {
        //GET DATA
        var data = snapshot.val();
        var username = data.name || "anonymous";
        var message = data.text;
        var time = data.time ? new Date(Number(data.time)).toTimeString() : '';
        console.log('time is',time);
        console.log('data.timeString', data.time);


        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var messageElement = $("<p>");
        var nameElement = $("<strong class='example-chat-username'></strong>:")
        nameElement.html(username + ' ' + time + ': ');
        messageElement.text(message).prepend(nameElement);

        //ADD MESSAGE
        messageList.append(messageElement)

        //SCROLL TO BOTTOM OF MESSAGE LIST
        messageList[0].scrollTop = messageList[0].scrollHeight;
      });


      function makeChat(authData) { 
        var chat = new Firechat(ref);
        chat.setUser(authData.auth.uid, authData.auth.username, function(user) {
          chat.resumeSession();
        });
      }

      $scope.login = function() {
        ref.authWithCustomToken(localStorage.firebaseToken, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Login Succeeded!", authData);
            makeChat(authData);
          }
        });
      }
      
    })

})();
