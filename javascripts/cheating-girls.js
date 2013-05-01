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
            
        }
        );
}
