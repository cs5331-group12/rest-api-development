$(document).ready(function() {
  var logged_in = false;

  //check if there is stored token
  var token = sessionStorage.getItem('token');
  logged_in = token == null ? true : false;

  // if(token) {
  //   $.ajax({
  //     type: 'POST',
  //     data: {
  //       "token": token,
  //     },
  //     url: "http://localhost:8080/users/expire",
  //     success:function(data) {
  //       if(data['status']) {
  //         logged_in = true;
  //       }
  //     }
  //   });
  // }

  console.log(logged_in)
  if (logged_in) {
      window.location.href = "/";
  }

  init_top_nav("Sign in");
  init_side_nav(".auth");
  init_auth_form(true);
})
