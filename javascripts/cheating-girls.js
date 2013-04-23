$(function(){
  if(location.href.indexOf("#") !== -1){
		trans = location.href.split("#")[1];
		$.ajax({
			url   : "http://127.0.0.1:9511/cheating-girls",
			type  : "GET",
			data  : trans,
			success : function(){
				console.log("success!");
				window.close();
			}
		})
	}
})
