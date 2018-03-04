$(document).ready(function() {
    init_top_nav("Public Diaries");
    init_side_nav(".view-public");

    var results = [];

    // TODO: get public diaries from backend
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/diary",
        success:function(data) {
            console.log(data)
            if(results["status"]) {
                results = data['result'];
                console.log(results)
                init_diaries(results, ".main-section-container", false);
            }
        }
    });
});
