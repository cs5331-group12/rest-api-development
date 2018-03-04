function init_diaries(result, container, edit_enabled, pub) {
    var diary = '<div class="row">'
    for (var i = 0; i < result.length; i ++) {
        var diary_card = init_diary(result[i], edit_enabled, pub);
        diary += diary_card
    }
    diary += '</div>'
    $(container).append(diary)
}

function setup_diary_card_callbacks() {
    $(".diary-section").on("click",".toggle-permission", function(e) {
        e.preventDefault();
        var $effectedDiaryCard = $(this);
        var url = "http://localhost:8080/diary/permission"

        var params = {
            id: parseInt(e.currentTarget.dataset.id),
            title: e.currentTarget.dataset.title,
            author: e.currentTarget.dataset.author,
            public: e.currentTarget.dataset.public === "false",
            text: e.currentTarget.dataset.text
        }

        var logged_in = isLoggedIn();

        if (!logged_in) {
            window.location.href = "/sign_in.html"
        }

        var token = sessionStorage.getItem('token');

        $.ajax({
          type: 'POST',
          data: {
            "token": token,
            "id": params.id,
            "public": params.public
          },
          url: url,
          success:function(data) {
            if(data['status']) {
                $effectedDiaryCard.closest('div[id^="'+e.currentTarget.dataset.id+'"]').remove();
                var section = params.public ? ".public-diary-section > .row" : ".private-diary-section > .row"
                $(section).append(init_diary(params, true, params.public));
                M.toast({html: 'The Diary has been made '+(params.public ? 'public' : 'private') +'!', classes: 'rounded green'});
            } else {
                M.toast({html: data['error'], classes: 'rounded red'});
            }
          }
        });
    })

    $(".diary-section").on("click", ".delete-diary", function(e) {
        e.preventDefault();
        var url = "http://localhost:8080/diary/delete"
        var id = parseInt(e.currentTarget.dataset.id)

        var logged_in = isLoggedIn();

        if (!logged_in) {
            window.location.href = "/sign_in.html"
        }

        var token = sessionStorage.getItem('token');

        $.ajax({
          type: 'POST',
          data: {
            "token": token,
            "id": id
          },
          url: url,
          success:function(data) {
            if(data['status']) {
                $("#"+id+"-card").remove();
                M.toast({html: 'Diary deleted successfully!', classes: 'rounded green'});
            } else {
                M.toast({html: data['error'], classes: 'rounded red'});
            }
          }
        });
    })
}

function init_diary(result, edit_enabled, pub) {
    var diary_card = '<div id="'+result.id+'-card" class="col s12 m6">';
    diary_card += '<div class="card">';
    diary_card += '<div class="card-content">'
    diary_card += '<span class="card-title">'+result.title+'</span>';
    diary_card += '<span>By: '+result.author+'</span>';
    diary_card += '<p>'+result.text+'</p>'
    if (edit_enabled) {
        diary_card += '<div class="card-action">';
        diary_card += '<a href="#" class="toggle-permission" data-id='+result.id+' data-title="'+result.title+'" data-author="'+result.author+'" data-public="'+result.public+'" data-text="'+result.text+'">'
        if (pub) {
            diary_card += 'make this private';
        } else {
            diary_card += 'make this public';
        }
        diary_card += '</a>'
        diary_card += '<a href="#" class="delete-diary" data-id="'+result.id+'">Delete</a>'
        diary_card += '</div>';
    }
    diary_card += '</div></div></div>'
    return diary_card;
}
