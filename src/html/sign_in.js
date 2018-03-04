$(document).ready(function() {
  var logged_in = false;

  //check if there is stored token
  var token = sessionStorage.getItem('token');
  logged_in = !(token == null || token == "");

  if(logged_in) { //might be logged in. So retrieve the user info to check if this user with this token exist
    $.ajax({
      type: 'POST',
      data: {
        "token": token,
      },
      url: "http://localhost:8080/users",
      success:function(data) {
        if(data['status']) {
          logged_in = true;
        }
      }
    });
  }

  if (logged_in) {
      window.location.href = "/";
  }

  init_top_nav("Sign in");
  init_side_nav(".auth");
  init_auth_form(true);
})
