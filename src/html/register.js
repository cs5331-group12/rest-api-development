$(document).ready(function() {
  var logged_in = isLoggedIn();

  if (logged_in) {
      window.location.href = "/";
  }

  init_top_nav("Register");
  init_side_nav(".auth");
  init_auth_form();
})
