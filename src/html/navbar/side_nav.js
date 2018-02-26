function init_side_nav() {
    $("#side-nav-section").load("navbar/side_nav.html", null, function() {
        $('#side-nav').sidenav();
    })
}