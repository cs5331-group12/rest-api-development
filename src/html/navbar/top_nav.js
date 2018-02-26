function init_top_nav(header) {
    $("#top-nav-section").load("navbar/top_nav.html", null, function() {
        $("#header").html(header)
    })
}