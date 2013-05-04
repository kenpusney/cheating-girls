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
            $("#hellomsg").text("你好，"+localStorage.getItem('nick'));
            share();
            getgirlcount();
        },
        function(e){
            alert("抱歉，登录失败，请重试。\nOh sorry, login failed, try again.")
        }
        );
}

function share(){
    T.api("/t/add",{content:"第二天，人们缺少发现美的工具，于是，人们需要帮助。 追随我们去寻找美丽吧： http://kenpusney.github.io/cheating-girls/cheating-girls.html",
                    clientip:"127.0.0.1"},
                    "json",
                    "post")
    .success(function(r){
        alert("欢迎，"+localStorage.getItem("nick")+"！");
    })
    .error(function(code,msg){
        alert("呀，出错啦！要不要再来一次？\nOops, we get an error, try again?");
    });
}

function logout(){
    T.logout();
    $("#hellomsg").text("你好，陌生人");
    localStorage.clear();
}

function getgirlcount(){
    T.api("/friends/fanslist_s",
        {"reqnum":"100","startindex":"0","install":"0","mode":"0"},
        "json", "get")
        .success(function(data){
            nog = data.data.info.reduce(function(p,c){ return p+(c.sex == 2)},0);
            $("num-of-girls").text(nog);
            $("num-of-girls-en").text(nog);
            $("#info-block").show()
        })
}