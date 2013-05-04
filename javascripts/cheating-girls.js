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
            getgirlcount();
        },
        function(e){
            alert("Oh sorry, login failed, try again.")
        }
        );
}

function share(){
    T.api("/t/add",{content:"第二天，人们缺少发现美的工具，于是，人们需要帮助。 http://kenpusney.github.io/cheating-girls/cheating-girls.html",
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

function getgirlcount(){
    T.api("/friends/fanslist_s",
        {"reqnum":"20","startindex":"0","install":"0","mode":"0"},
        "json", "get")
        .success(function(data){
            $("#num-of-girls").text(data.data.info.reduce(function(p,c){ return p+(c.sex == 2)},0));
            $("#info-block").show()
        })
}