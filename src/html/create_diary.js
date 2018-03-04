$(document).ready(function() {
    var logged_in = isLoggedIn();

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
    var process_request = true;
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

        var token = sessionStorage.getItem('token');
        $.ajax({
          type: 'POST',
          data: {
            "token": token,
            "title": params["title"],
            "public": false,
            "text": params["text"]
          },
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
