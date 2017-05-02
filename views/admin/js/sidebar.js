$(function() {
    $(window).bind("load resize", function() {
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    });



var update = function(params){

    $.ajax({

        url         : 'http://138.197.219.168/api/form/set-status',
        type        : 'POST',
        contentType : 'application/json',
        dataType    : "json",
        data        :  params,

        success:  function(data){

            //alert("Element Changed status!");
            //trigger change
            $('#progressbar').click();
        },
        failure: function(err){
            alert(err);
        }

    });
}


var sendEmail = function(params){

    //dest -> destino
    $.ajax({

        url         : 'http://138.197.219.168/api/form/send-mail',
        type        : 'POST',
        contentType : 'application/json',
        dataType    : "json",
        data        :  params,

        success:  function(data){

            //alert("Message sent!");
            //trigger change
            //$('#progressbar').click();
        },
        failure: function(err){
            alert(err);
        }

    });



}






//sorry for the callback hell
function setup_template_button(template, state, id){


        template.querySelector('#del').addEventListener( 'click', function() { 


            //llamada async
            $.ajax({


                url: 'http://138.197.219.168/api/form/' +id,
                type: 'DELETE',
                success:  function(data){


                    //alert("Deleted on the database!");
                    var elementid = "#" +id;

                    $(elementid).fadeToggle( "slow", "linear" );
                    $(elementid).remove();
                    //trigger change
                    $('#progressbar').click();


                },
                failure: function(err){
                    alert(err);
                }

            });//end of asyncall

        });//end of action listener


        // Add behaviour depending on the state
        switch(state){
            case 1:
                //disable other buttons
                template.querySelector('#terminado-2').className = " disabled";
                template.querySelector('#terminado-3').className = " disabled";
                template.querySelector('#terminado-1').addEventListener( 'click', function() { 

                    var newStatus = 2;

                     var params = JSON.stringify({ 

                            "status"  : newStatus,
                            "id"      : id,
                        
                     });

                     update(params);
                     
                });//end of action listener

            break;

            case 2:

                template.querySelector('#terminado-1').className = " disabled";
                template.querySelector('#terminado-3').className = " disabled";
                template.querySelector('#terminado-2').addEventListener( 'click', function() { 

                    //SEND EMAIL HERE!!

                     var params = JSON.stringify({ 

                            "id"      : id,
                            "type"    : "doctor"
                            
                     });

                     console.log(params);

                     sendEmail(params);

                });//end of action listener
            break;

            case 3:

                template.querySelector('#terminado-1').className = " disabled";
                template.querySelector('#terminado-2').className = " disabled";
                template.querySelector('#terminado-3').addEventListener( 'click', function() { 

                    //Change status to put it in completed
                    var newStatus = 4;

                     var params = JSON.stringify({ 

                            "status"  : newStatus,
                            "id"      : id,
                        
                     });

                    update(params);


                });//end of action listener
            break;


        }//end of switch

    }




    //fills progress
    function setup_template_progress(template, state){

        //rsorry for the hardcoding u.u 
        template.content.querySelector('#status-1').className = "col-md-4 bs-wizard-step";
        template.content.querySelector('#status-2').className = "col-md-4 bs-wizard-step";
        template.content.querySelector('#status-3').className = "col-md-4 bs-wizard-step";

        //class gets appended through all other consecutive templates
        //so we ended up having active disabled active, and so :(

        switch(state){
            case 1:
                console.log("case 1");
                template.content.querySelector('#status-1').className += " active";
                template.content.querySelector('#status-2').className += " disabled";
                template.content.querySelector('#status-3').className += " disabled";

                return template;    

            case 2:
                template.content.querySelector('#status-1').className += " complete";
                template.content.querySelector('#status-2').className += " active";
                template.content.querySelector('#status-3').className += " disabled";
                return template;

            case 3:
                template.content.querySelector('#status-1').className += " complete";
                template.content.querySelector('#status-2').className += " complete";
                template.content.querySelector('#status-3').className += " active";
                return template;


        }   

       
    }




    //visually change it
    function setup_template(i, obj) {

        var template = document.querySelector('#progress-template');

        //setting static variables
        var name = template.content.querySelector('#record-name');
        name.textContent = obj.name;

        var center = template.content.querySelector('#record-loc');
        center.textContent = obj.locale;

        var speciality = template.content.querySelector('#record-spec');
        speciality.textContent = obj.speciality;

        var contact = template.content.querySelector('#record-email');
        contact.textContent = obj.email;

        setup_template_progress(template, obj.status);
        //setup_template_button(template, obj.status);



        return template;
    };







 $(".jumpto").click(function() {
				


        //Changes the tabs 
    	$(".wrapper").hide();
    	$(".wrapper#content"+$(this).attr('id')).show();
        $("li[class='active jumpto']").attr('class', 'jumpto');
        $(this).attr('class', 'active jumpto');
    	
        // Gets and appends the template
        if($(this).attr('id') == "progressbar"){

            $.ajax({
                url: 'http://138.197.219.168/api/form/on-progress',
                type : 'GET',

                success: function (data) {

                    console.log(data);

                    // Poblar template
                    var container = document.querySelector('#prog-container'); 
                    
                    //delete them
                    while (container.firstChild) {
                            container.removeChild(container.firstChild);
                    }


                    $.each(data, function (i, obj) {

                        console.log(obj.status);
                        var template = setup_template(i, obj);
                        template = document.importNode(template.content, true); 

                        //add listener
                        setup_template_button(template, obj.status, obj._id);
                        container.appendChild(template);



                    });

                },

                failure: function(err){
                        alert(err);
                } 
            });
        }
	});
});
