$(document).ready(function() {
  //check if there is stored token
  var token = sessionStorage.getItem('key');
  console.log(token)
  // TODO: Check if user is logged in
  // var logged_in = false || ;
  if (logged_in) {
      window.location.href = "/";
  }
  init_top_nav("Register");
  init_side_nav(".auth");
  init_auth_form();
})
