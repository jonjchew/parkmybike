var Page = {
	initialize: function(){
		Page.bindFormAJAX()
	},
	bindFormAJAX: function(){
		$( "form" ).on( "submit", function( event ) {
  			event.preventDefault();
  			var data = $(this).serialize()
  			$.post('/', data, function(response){
        		console.log(response);
    		});
		});
	},
	setCoordinatesForForm: function(latitude, longitude){
		$('#latitude').val(latitude);
      	$('#longitude').val(longitude);
	}
}