T.init({
        appkey:801051784
    });    

/*
 * 重构之后仍然是翔一般的华丽
 * Still shit-like after refactor.
*/
var cg = {
    login: function login(){
            T.login(function(l){
                    localStorage.setItem("nick",l.nick);
                    localStorage.setItem("name",l.name);
                    localStorage.setItem("access_token",l.access_token);
                    localStorage.setItem("openid",l.openid);
                    $("#hellonick").text(localStorage.getItem('nick'));
                    $("#btn-login").hide();
                    $("#btn-logout").show();
                    cg.share("第二天，人们缺少发现美的工具，于是，人们需要帮助。 追随我们去寻找美丽吧：");
                    cg.getgirlcount("100");
                    cg.getbccount();
                },
                function(e){
                    alert("抱歉，登录失败，请重试。\nOh sorry, login failed, try again.")
                }
            );
        },
    share: function(text){
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
        },
    logout: function(){
            T.logout();
            $("#btn-login").show();
            $("#hellonick").text("陌生人");
            $("#info-block").hide();
            $("#bc-info").hide();
            localStorage.clear();
        },
    getgirlcount: function(limit){
            T.api("/friends/fanslist_s",
                {"reqnum":limit,"startindex":"0","install":"0","mode":"0"},
                "json", "get")
            .success(function(data){
                nog = data.data.info.reduce(function(p,c){ return p+(c.sex == 2)},0);
                $("#num-of-girls").text(nog);
                $("#num-of-girls-en").text(nog);
                $("#info-block").show();
            });
        },
    getbccount: function(){
            T.api("/search/t",{"keyword":"http://url.cn/FNAfcG",
                            "pagesize":"1","page":"1","contenttype":"0","sorttype":"0",
                            "msgtype":"0","searchtype":"0","starttime":"0","endtime":"0",
                            "longitue":"","latitude":"","radius":"20000","province":"","city":"","needdup":"0"},
                    "json", "get")
            .success(function (res){
                $("#bc-count").text(res.data.totalnum);
                $("#bc-info").show();
            })
            .error(function (code, message) {
                $("#bc-info").text("暂时无法获取相关信息");
            });
        }
};

$(function(){
    /*UI-init*/
    cg.getbccount();
    if(T.loginStatus()){
        $("#hellonick").text(localStorage.getItem('nick') || "陌生人");
        cg.getgirlcount("100");
    }
    /*Event-init*/
    $("#btn-login").click(cg.login);
    $("#btn-logout").click(cg.logout);
    $("#btn-info-share").click(function(){
           cg.share($('#sharable').text() + '。去发现更多艳遇吧：'); 
        });
    $(".sharable").click(
        function(){
            cg.share($(this).text());
        });
});
