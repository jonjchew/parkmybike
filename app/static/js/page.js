var Page = {
	initialize: function(){
		Page.bindFormAJAX()
	},
	bindFormAJAX: function(){
		$( "form" ).on( "submit", function( event ) {
  			event.preventDefault();
  			var data = $(this).serialize()
  			$.post('/', data, function(response){
        		var coordinatesArray = Page.getCoordinatesArray(response.results)
        		GoogleMaps.addMarkers(coordinatesArray)
    		});
		});
	},
	setCoordinatesForForm: function(latitude, longitude){
		$('#latitude').val(latitude);
      	$('#longitude').val(longitude);
	},
	getCoordinatesArray: function(responseArray){
		var coordinatesArray = []
		for(var i = 0; i < responseArray.length; i++){
			coordinatesArray.push([responseArray[i]['latitude'], responseArray[i]['longitude']])
		}	
		return coordinatesArray
	}
}