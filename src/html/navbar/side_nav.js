function init_side_nav(focus_side_nav) {
    $("#side-nav-section").load("navbar/side_nav.html", null, function() {
        $('#side-nav').sidenav();
        $(focus_side_nav).addClass('active')
        // TODO: Check if the user is logged in
        var logged_in = false;
        if (logged_in) {
            $(".auth").html('<a href="#!">Logout</a>')
            $(".auth").on("click", function(e) {
                e.preventDefault();
                // TODO: Expire token
                window.location.href="/";
            })
        }
    })
}