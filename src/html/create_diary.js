$(document).ready(function() {
    // TODO: Check if user is logged in, if not redirect
    var logged_in = true;
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