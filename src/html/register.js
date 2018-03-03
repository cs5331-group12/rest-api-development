$(document).ready(function() {
  var logged_in = false;

  //check if there is stored token
  var token = sessionStorage.getItem('token');

  if(token) {
    $.ajax({
      type: 'POST',
      data: {
        "token": token,
      },
      url: "http://localhost:8080/users/expire",
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

  init_top_nav("Register");
  init_side_nav(".auth");
  init_auth_form(logged_in);
})
