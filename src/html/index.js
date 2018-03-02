$(document).ready(function() {
    init_top_nav("Public Diaries");
    init_side_nav(".view-public");
    // TODO: get results from backend
    $.ajax({
        url:"http://localhost:8080/diary",
        success:function(data) {
          console.log(data)
        }
    });

    var results = {
        "status": true,
        "result": [
          {
            "id": 1,
            "title": "My First Project",
            "author": "ashrugged",
            "publish_date": "2013-02-27T13:37:00+00:00",
            "public": true,
            "text": "If you don't know, the thing to do is not to get scared, but to learn."
          },
          {
            "id": 2,
            "title": "A New Lesson!",
            "author": "audrey123talks",
            "publish_date": "2013-02-29T13:37:00+00:00",
            "public": true,
            "text": "Check out my latest video!"
          }
        ]
      }
    init_diaries(results["result"], ".main-section-container", false);
});
