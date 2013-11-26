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
        		Page.appendSpots(response.results)
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
	},
	appendSpots: function(spotsArray){
		for(var i = 0; i < spotsArray.length; i++){
			distance = spotsArray[i]['distance'].toFixed(2)
			if(spotsArray[i]['name'] === '_undetermined') {
				$('#spot-list').append("<li>" +	 spotsArray[i]['address'] + " (" + distance + "mi)" + "</li>")
			}
			else if(spotsArray[i]['address'] === 'None'){
				$('#spot-list').append("<li>" +	 spotsArray[i]['name'] + " (" + distance + "mi)" + "</li>")
			}
			else{
				$('#spot-list').append("<li>" +	 spotsArray[i]['name'] +  ", " + spotsArray[i]['address'] + " (" + distance + "mi)" + "</li>")
			}
		}
	}
}