$(document).ready(function() {
    init_top_nav("Your Diaries");
    init_side_nav(".view-private");
    var results = {
        "status": true,
        "result": [
          {
            "id": 2,
            "title": "A New Lesson!",
            "author": "audrey123talks",
            "publish_date": "2013-02-29T13:37:00+00:00",
            "public": true,
            "text": "Check out my latest video!"
          },
          {
            "id": 3,
            "title": "No One Can See This Post",
            "author": "audrey123talks",
            "publish_date": "2013-02-29T13:38:00+00:00",
            "public": false,
            "text": "It is very secret!"
          }
        ]
      }
    // init_diary(results);
});