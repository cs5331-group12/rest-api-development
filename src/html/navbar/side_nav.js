function init_side_nav(focus_side_nav) {
    $("#side-nav-section").load("navbar/side_nav.html", null, function() {
        $('#side-nav').sidenav();
        $(focus_side_nav).addClass('active')
    })
}