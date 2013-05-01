T.init({
        appkey:801051784
    });

function login(){
    T.login(
        function(l){
            $("#hellomsg").innerText="Hello, "+ l.nick;
        },
        function(e){
            $("#hellomsg").innerText=e.message
        }
        );
}
