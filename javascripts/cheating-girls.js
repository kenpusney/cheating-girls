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
            $("#hellonick").text(localStorage.getItem('nick'));
            share("第二天，人们缺少发现美的工具，于是，人们需要帮助。 追随我们去寻找美丽吧：");
            getgirlcount("100");
        },
        function(e){
            alert("抱歉，登录失败，请重试。\nOh sorry, login failed, try again.")
        }
        );
}

function share(text){
    T.api("/t/add",{content: text + " http://kenpusney.github.io/cheating-girls/cheating-girls.html",
                    clientip:"127.0.0.1"},
                    "json",
                    "post")
    .success(function(r){
        alert("成功！\nSuccess!");
    })
    .error(function(code,msg){
        alert("呀，出错啦！要不要再来一次？\nOops, we get an error, try again?");
    });
}

function logout(){
    T.logout();
    $("#hellonick").text("陌生人");
    $("#info-block").hide();
    localStorage.clear();
}

function getgirlcount(limit){
    T.api("/friends/fanslist_s",
        {"reqnum":limit,"startindex":"0","install":"0","mode":"0"},
        "json", "get")
        .success(function(data){
            nog = data.data.info.reduce(function(p,c){ return p+(c.sex == 2)},0);
            $("#num-of-girls").text(nog);
            $("#num-of-girls-en").text(nog);
            $("#info-block").show()
        })
}

$(function(){
    if(T.loginStatus()){
        $("#hellonick").text(localStorage.getItem('nick') || "陌生人");
        getgirlcount();
    }
})