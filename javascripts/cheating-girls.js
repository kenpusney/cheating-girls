T.init({
        appkey:801051784
    });    

/*
 * 重构之后仍然是翔一般的华丽
 * Still shit-like after refactor.
*/
var window.cguser;
var cg = {
    login: function(){
            T.login(function(l){
                    window.cguser = l;
                    localStorage.setItem("nick",l.nick);
                    localStorage.setItem("name",l.name);
                    localStorage.setItem("access_token",l.access_token);
                    localStorage.setItem("openid",l.openid);
                    cg.logged();
                    cg.share("第三天，人们发现了美，同时，人们需要对美作出选择。 其实选择可以更加的智能：");
                },
                function(e){
                    alert("抱歉，登录失败，请重试。\nOh sorry, login failed, try again.")
                }
            );
        },
    logged: function(){
            if (T.loginStatus()){
                $("#hellonick").text(localStorage.getItem('nick') || "陌生人");
                $("#btn-login").hide();
                $("#btn-logout").show();
                cg.getgirlcount("100");
                cg.getbccount();
            }else{
                $("#btn-login").show();
                $("#btn-logout").hide();
                $("#hellonick").text("陌生人");
                $("#info-block").hide();
                $("#bc-info").hide();
            }
        },
    share: function(text){
            T.api("/t/add",{content: text + " http://kenpusney.github.io/cheating-girls/cheating-girls.html",
                            clientip:"127.0.0.1"},
                            "json",
                            "post")
            .success(function(r){
                console.log("成功！\nSuccess!")
            })
            .error(function(code,msg){
                alert("呀，出错啦！要不要再来一次？\nOops, we get an error, try again?");
            });
        },
    logout: function(){
            T.logout();
            cg.logged();
            localStorage.clear();
        },
    getgirlcount: function(limit){
            T.api("/friends/fanslist_s",
                {"reqnum":limit,"startindex":"0","install":"0","mode":"0"},
                "json", "get")
            .success(function(data){
                nog = data.data.info.reduce(function(p,c){ return p+(c.sex == 2)},0);
                $(".num-of-girls").text(nog);
                $("#info-block").show();
                cg.analysisgirls(data.data.info)
            })
            .error(function(){
                console.log("获取关注者列表失败！\nFailed to get follower list.");
            });
        },
    analysisgirls: function(info){
            vinfo = info;
            /*TODO: may failed on other platform*/
            vinfo.filter(function(e){
                return e.sex == 2;
            })
            .map(function(e){
                cguser = window.cguser;
                e.score = 0;
                T.api("/user/other_info",
                    {"name":e.name,"fopenid":""},
                    "json", "get")
                .success(function(g){
                    e.score = 1 + g.ismyidol*3 + (2-g.isrealname)*3
                            - g.isvip*2
                            + (g.location == cguser.location)*5
                            + (g.birth_year == cguser.birth_year)*3
                            + (g.birth_month == cguser.birth_month)*2
                            + g.send_private_flag*5;
                })
                return e;
            })
            .sort(function(a,b){
                return a.score < b.score;
            })
            .slice(0,10)
            .forEach(function(e){
                $("#girl-list").append("<li class='girl'>"+e.nick+"（@"+e.name+"）"+e.score+"</li>");
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
    cg.logged();
    /*Event-init*/
    $("#btn-login").on('click',cg.login);
    $("#btn-logout").on('click',cg.logout);
    $(".sharable").on('click',
        function(){
            cg.share($(this).text() + '。你还不知道怎么选么？看这里：');
            alert("分享已经提交，后台执行中！\nSubmitted and processing in backend!");
        });
    $("a").attr("target","_blank");
});
