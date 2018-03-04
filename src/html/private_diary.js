$(document).ready(function() {
    var results = [];
    var logged_in = isLoggedIn();

    if (!logged_in) {
        window.location.href = "/sign_in.html"
    }

    init_top_nav("Your Diaries");
    init_side_nav(".view-private");

    if(logged_in) {
        var url = "http://localhost:8080/diary"
        var token = sessionStorage.getItem('token');

        $.ajax({
          type: 'POST',
          data: {
            "token": token
          },
          url: url,
          success:function(data) {
            if(data['status']) {
                results = data['result']
            } else {
                M.toast({html: data['error'], classes: 'rounded red'});
            }
          }
        });
    }

    init_diaries(results.filter(function(res) { return res.public; }), ".public-diary-section", true, true);
    init_diaries(results.filter(function(res) { return !res.public; }), ".private-diary-section", true, false);
    setup_diary_card_callbacks();
});
