$(document).ready(function() {
    init_top_nav("Public Diaries");
    init_side_nav(".view-public");

    var results = {};

    // TODO: get public diaries from backend
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/diary",
        success:function(data) {
          results = data;
        }
    });

    if(results["status"]) {
        init_diaries(results["result"], ".main-section-container", false);
    }
});
