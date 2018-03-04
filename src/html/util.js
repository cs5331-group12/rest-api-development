function isLoggedIn() {
  var toReturn = false;

  var token = sessionStorage.getItem('token');
  toReturn = !(token == null || token == "");

  if(toReturn) { //might be logged in. So retrieve the user info to check if this user with this token exist
      $.ajax({
        type: 'POST',
        data: {
          "token": token,
        },
        url: "http://localhost:8080/users",
        success:function(data) {
          if(!data['status']) {
            toReturn = false;
          }
        }
      });
  }

  return toReturn;
}
