function init_auth_form(login) {
    $(".main-section-container").load("auth/auth_form.html", null, function() {
        if (login) {
            $(".auth-form-header").html("Log in")
            $(".auth-form-toggle").html('<p>Don\'t have an account? Click <a href="/register.html">here</a></p>')
            $("#auth-form-button").html('Sign in')
        } else {
            $(".auth-form-header").html("Register an account")
            $(".password-input-field").after(full_name_input());
            $(".fullname-input-field").after(age_input());
            $(".auth-form-toggle").html('<p>Already had an account? Click <a href="/sign_in.html">here</a></p>')
            $("#auth-form-button").html("Register")
        }
        $("#auth-form-button").on("click", (e) => {
            e.preventDefault();
            submitAuthForm(login);
        });
    });
}

function submitAuthForm(login) {
    var params = {}
    params["username"] = $("#username").val() || "";
    params["password"] = $("#password").val() || "";
    if (!login) {
        params["fullname"] = $("#fullname").val() || "";
        params["age"] = parseInt($("#age").val());

        if(!(params["username"] && params["password"] && params["fullname"] && params["age"])) {
            M.toast({html: "Don't leave the form hanging! All fields are required", classes: 'rounded red'});
            return;
        }
    } else {
        if(!(params["username"] && params["password"])) {
            M.toast({html: "Don't leave the form hanging! All fields are required", classes: 'rounded red'});
            return;
        }
    }

    $.ajax({
      type: 'POST',
      data: params,
      url: "http://localhost:8080/users/register",
      success:function(data) {
        console.log(data)
      }
    });
    // TODO: Register/Sign in Request
    // After succeed, direct to home page
    // if (success) {
    //     M.toast({html: 'Success! Bringing you to home page', classes: 'rounded green', displayLength: 500, completeCallback: function() {window.location.href = "/";}})
    // } else {
    //     M.toast({html: 'Error message', classes: 'rounded red'});
    // }
}

function full_name_input() {
    return '<div class="input-field fullname-input-field col s12 m12 offset-l2 l8"><input id="fullname" type="text" class="form-input"><label for="fullname">Full name</label></div>';
}

function age_input() {
    return '<div class="input-field age-input-field col s12 m12 offset-l2 l8"><input id="age" type="number" class="form-input"><label for="age">Age</label></div>';
}
