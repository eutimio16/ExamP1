$(document).ready(function() {


	$("#sub").click(function(){
		var name 	= document.getElementById("name").value;
		var lname 	= document.getElementById("lname").value;
		var email 	= document.getElementById("email").value;
		var nation 	= document.getElementById("selection").value;
		var comment = document.getElementById("comment").value;

		var spec  	= localStorage.getItem("speciality");
		var locale  = localStorage.getItem("locale");

		var record = JSON.stringify({ 
			"name"				: name,
			"lname" 			: lname,
			"email"				: email,
			"nationality"		: nation,
			"comment"			: comment,
			"speciality" 		: spec,
			"locale"			: locale,
			"status"			: 0
		});

		console.log(record);

		
		$.ajax({

			url			: 'http://138.197.219.168/api/form',
		    type 		: 'POST',
		    contentType : 'application/json',
		    dataType	: "json",
		    data		:  record,
			success: function(data){//alert(data);
				window.location.href = "conf.html"; 
			},
        	failure: function(errMsg) {
            	alert(errMsg);
        	}
		});
	});
}); 