T.init({
        appkey:801051784
    });

function login(){
    T.login(
        function(l){
            localStorage.setItem("nick",l.nick);
            localStorage.setItem("name",l.name);
            localStorage.setItem("access_token",l.access_token);
            localStorage.setItem("openid",l.openid);
            $("#hellomsg").text("Hello, "+localStorage.getItem('nick'));
            share();
        },
        function(e){
            alert("Oh sorry, login failed, try again.")
        }
        );
}

function share(){
    T.api("/t/add",{content:"第一天，世界是美好的，世界被拯救了。 http://kenpusney.github.io/cheating-girls/cheating-girls.html",
                    clientip:"127.0.0.1"},
                    "json",
                    "post")
    .success(function(r){
        alert("Welcome "+localStorage.getItem("nick")+".");
    })
    .error(function(code,msg){
        alert("Error.");
    });
}

function logout(){
    T.logout();
    localStorage.clear();
}
