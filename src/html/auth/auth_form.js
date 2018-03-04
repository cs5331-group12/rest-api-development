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
    var process_request = true;
    var url = "";
    var params = {}

    params["username"] = sanitize($("#username").val() || "");
    params["password"] = $("#password").val() || "";

    if (!login) {
        url = "http://localhost:8080/users/register";

        params["fullname"] = sanitize($("#fullname").val() || "");
        params["age"] = parseInt($("#age").val());

        if(!(params["username"] && params["password"] && params["fullname"] && params["age"])) {
            M.toast({html: "Don't leave the form hanging! All fields are required", classes: 'rounded red'});
            process_request = false;
        }
    } else {
        url = "http://localhost:8080/users/authenticate";

        if(!(params["username"] && params["password"])) {
            M.toast({html: "Don't leave the form hanging! All fields are required", classes: 'rounded red'});
            process_request = false;
        }
    }

    if(process_request) {
        $.ajax({
          type: 'POST',
          data: params,
          url: url,
          success:function(data) {
            var status = data['status'];

            if(status) {
                if(login) {
                    var token = data['result']['token'];

                    sessionStorage.setItem('token', token);

                    M.toast({html: 'Success! Bringing you to home page', classes: 'rounded green', displayLength: 500, completeCallback: function() {window.location.href = "/";}});
                } else {
                    M.toast({html: 'Your Registration is successful!', classes: 'rounded green', displayLength: 500});

                    //if register user is successful, log the user in
                    $.ajax({
                        type: 'POST',
                        data: params,
                        url: "http://localhost:8080/users/authenticate",
                        success:function(data) {
                            var status = data['status'];

                            if(status) {
                                var token = data['result']['token'];

                                sessionStorage.setItem('token', token);

                                M.toast({html: 'Bringing you to home page', classes: 'rounded green', displayLength: 500, completeCallback: function() {window.location.href = "/";}});
                            } else {
                                M.toast({html: 'Login unsuccessful!', classes: 'rounded red', displayLength: 500});
                            }
                        }
                    });
                }
            } else {
                if(login) {
                    M.toast({html: "Incorrect username or password", classes: 'rounded red'});
                } else {
                    M.toast({html: data['error'], classes: 'rounded red'});
                }
            }
          }
        });
    }
}

function full_name_input() {
    return '<div class="input-field fullname-input-field col s12 m12 offset-l2 l8"><input id="fullname" type="text" class="form-input"><label for="fullname">Full name</label></div>';
}

function age_input() {
    return '<div class="input-field age-input-field col s12 m12 offset-l2 l8"><input id="age" type="number" class="form-input"><label for="age">Age</label></div>';
}
