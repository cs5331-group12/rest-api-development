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
    var url = "http://localhost:8080/diary/create"
    var params = {}
    params["title"] = $("#title").val() || "";
    params["text"] = $("#text").val() || "";

    if(!(params["title"] && params["text"])) {
        M.toast({html: "You have some empty fields.", classes: 'rounded red'});
        process_request = false;
    }

    // Create Diary Request
    if(process_request) {
        var logged_in = isLoggedIn();

        if (!logged_in) {
            window.location.href = "/sign_in.html"
        }

        $.ajax({
          type: 'POST',
          data: {
            "token": "6bf00d02-dffc-4849-a635-a21b08500d61",
            "title": "No One Can See This Post",
            "public": false,
            "text": "It is very secret!"
          }
          url: url,
          success:function(data) {
            cleanUpForm()
            M.toast({html: 'Diary created successfully', classes: 'rounded green'});
          }
        });
    }

    // if (success) {

    // } else {
    //     M.toast({html: 'Error message', classes: 'rounded red'});
    // }
}

function cleanUpForm() {
    $("#title").val("");
    $("#text").val("");
    M.textareaAutoResize($('#text'));
}
