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
            if(!data['status']) {
              logged_in = false;
            }
          }
        });
    }

    if (!logged_in) {
        window.location.href = "/sign_in.html"
    }

    init_top_nav("Create diary");
    init_side_nav(".create-diary");
    $("#create-diary").on("click", function(e) {
        e.preventDefault();
        submitDiary();
    })
})

function submitDiary() {
    var params = {}
    params["title"] = $("#title").val() || "";
    params["text"] = $("#text").val() || "";
    M.toast({html: 'This is not implemented yet!!!', classes: 'rounded red'});
    // TODO: Create Diary Request
    // if (success) {
    //    cleanUpForm()
    //     M.toast({html: 'Diary created successfully', classes: 'rounded green'});
    // } else {
    //     M.toast({html: 'Error message', classes: 'rounded red'});
    // }
}

function cleanUpForm() {
    $("#title").val("");
    $("#text").val("");
    M.textareaAutoResize($('#text'));
}
