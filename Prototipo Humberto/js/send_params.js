$(document).ready(function(){

	$('#search').click(function(){

		var locale = $('#center').val();
		var speciality = $("#speciality").val();

		localStorage.setItem("locale", locale);
		localStorage.setItem("speciality", speciality);

	});

});


;