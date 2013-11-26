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
        		var coordinatesArray = Page.getCoordinatesArray(response.results)
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
	}
}