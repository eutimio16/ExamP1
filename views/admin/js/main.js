$(document).ready(function(){


	function setup_template(i, obj) {

		//select the template on DOM
		var template = document.querySelector('#record-template');

		var name = template.content.querySelector('.record-name');
		name.textContent = obj.name;

		var spec = template.content.querySelector('.record-spec');
		spec.textContent = obj.speciality;

		var nat = template.content.querySelector('.record-nat');
		nat.textContent = obj.nationality;

		var email = template.content.querySelector('.record-email');
		email.textContent = obj.email;

		var comm = template.content.querySelector('.record-comments');
		comm.textContent = obj.comment;

		var loc  = template.content.querySelector('.record-loc');
		loc.textContent = obj.locale;

		//adding an id to the parent container --> row
		var parent_container  = template.content.querySelector('.row-template');
		parent_container.id   = obj._id;

		return template;

	};




	// Gets all registres
	$.ajax({

			url: 'http://138.197.219.168/api/form',
		    type: 'GET',
		 	
    		success: function (data) {

    			var recordContainer = document.querySelector('#template-container');

        		$.each(data, function (i, obj) {

        			console.log(obj);
        			var template = setup_template(i, obj);
        			template = document.importNode(template.content, true);	
        			$(template).attr('id', obj._id);


        			//adding listener to the reject button
        			template.querySelector('#del').addEventListener( 'click', function() {

						var id = obj._id;

						//llamada async
						$.ajax({


							url: 'http://138.197.219.168/api/form/' +id,
   	 						type: 'DELETE',
   	 						success:  function(data){


   	 							alert("Deleted on the database!");
   	 							var elementid = "#" +id;

   	 							$(elementid).fadeToggle( "slow", "linear" );
   	 							$(elementid).remove();

   	 
   	 						},
   	 						failure: function(err){
   	 							alert(err);
   	 						}



						});
					});


					//	adding listener to the reject button
        			template.querySelector('#accept').addEventListener( 'click', function() {

						
						//console.log(obj._id);
						var id = obj._id;
						var params = JSON.stringify({ 
							"id"			: id,
							"status"		: 1
						});
						console.log(params);

						//llamada async
						$.ajax({


							url 		: 'http://138.197.219.168/api/form/set-status',
   	 						type  		: 'POST',
   	 						contentType : 'application/json',
		    				dataType	: "json",
   	 						data 		:  params,

   	 						success:  function(data){

   	 							alert("Element Changed status!");
   	 							var elementid = "#" +id;
   	 							$(elementid).remove();

   	 
   	 						},
   	 						failure: function(err){
   	 							alert(err);
   	 						}



						});
					});

        		recordContainer.appendChild(template);
        	});
   		 }
	});

});
	