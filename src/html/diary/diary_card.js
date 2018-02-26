function init_diary(result) {
    var diary = '<div class="row">'
    for (var i = 0; i < result["result"].length; i ++) {
        var diary_card = '<div class="col s12 m6">';
        diary_card += '<div class="card">';
        diary_card += '<div class="card-content">'
        diary_card += '<span class="card-title">'+result["result"][i].title+'</span>';
        diary_card += '<span>By: '+result["result"][i].author+'</span>';
        diary_card += '<p>'+result["result"][i].text+'</p>'
        diary_card += '</div></div></div>'
        diary += diary_card
    }
    diary += '</div>'
    $('.main-section-container').append(diary)
}