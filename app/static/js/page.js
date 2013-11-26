var Page = {
	initialize: function(){
		Page.bindFormAJAX()
	},
	bindFormAJAX: function(){
		$( "form" ).on( "submit", function( event ) {
  			event.preventDefault();
  			var data = $(this).serialize()
  			$.post(url, data, function(response){
        		;
    		});
		});
	},
	setCoordinatesForForm: function(latitude, longitude){
		$('#latitude').val(latitude);
      	$('#longitude').val(longitude);
	}
}