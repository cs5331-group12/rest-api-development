function init_side_nav(focus_side_nav) {
    $("#side-nav-section").load("navbar/side_nav.html", null, function() {
        $('#side-nav').sidenav();
        $(focus_side_nav).addClass('active')
        var logged_in = isLoggedIn();
        if (logged_in) {
            $(".auth").html('<a href="#!">Logout</a>')
            $(".auth").on("click", function(e) {
                e.preventDefault();
                logOut(function() { window.location.href="/"; });
            })
        }
    })
}