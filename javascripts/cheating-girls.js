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
        },
        function(e){
            share();
        }
        );
}

function share(){
    T.api("/t/add",{content:"我正在用cheating-girls，你也来试试吗？ http://kenpusney.github.io/cheating-girls/cheating-girls.html",
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
