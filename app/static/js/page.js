var Page = {
	initialize: function(){
		Page.bindSearch()
		Page.bindNoSanFran()
	},
	bindSearch: function(){
		$( "#find" ).on( "click", function( event ) {
			var data = {
				latitude: GoogleMaps.origin.ob,
				longitude: GoogleMaps.origin.pb
			}
  			event.preventDefault();
  			$.post('/', data, function(response){
  				global = response
        		var coordinatesArray = Page.getCoordinatesArray(response.results)
        		// Page.appendSpots(response.results)
        		GoogleMaps.addMarkers(coordinatesArray)
    		});
		});
	},
	bindNoSanFran: function(){
		$( "#no-sf" ).on( "click", function( event ) {
			var data = {
				latitude: 37.78751,
				longitude: -122.40737
			}
  			event.preventDefault();
  			$.post('/', data, function(response){
  				GoogleMaps.recenterMap(data)
        		var coordinatesArray = Page.getCoordinatesArray(response.results)
        		// Page.appendSpots(response.results)
        		GoogleMaps.addMarkers(coordinatesArray)
    		});
		});
	},
	getCoordinatesArray: function(responseArray){
		var coordinatesArray = []
		for(var i = 0; i < responseArray.length; i++){
			coordinatesArray.push([responseArray[i]['latitude'], responseArray[i]['longitude'], responseArray[i]['name']])
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