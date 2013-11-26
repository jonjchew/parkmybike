var Page = {
	initialize: function(){
		Page.bindSearch()
	},
	bindSearch: function(){
		$( "#find" ).on( "click", function( event ) {
			var data = {
				latitude: GoogleMaps.origin.ob,
				longitude: GoogleMaps.origin.pb
			}
  			event.preventDefault();
  			Page.showLoad()
  			$.post('/', data, function(response){
  				if(response.results.length === 0){
  					Page.showNoSf()
  					Page.bindNoSanFran()
  				}
  				else{
  					Page.hideModal()
	        		GoogleMaps.addMarkers(response.results)
  				}
    		});
		});
	},
	bindNoSanFran: function(){
		$( "#no-sf" ).on( "click", function( event ) {
  			Page.showLoad()
			var data = {
				latitude: 37.78751,
				longitude: -122.40737
			}
  			event.preventDefault();
  			$.post('/', data, function(response){
  				Page.hideModal()
  				GoogleMaps.recenterMap(data)
        		GoogleMaps.addMarkers(response.results)
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
	showLoad: function(){
		$('#modal').html("Finding spots...<p><img src='static/images/bikeload.gif' id='load-img'></p>")
		$('#modal').addClass('show')
	},
	showNoSf: function(){
		$('#modal').html("We can't seem to find any spots near you. Are you not in San Francisco? <p><button type='button' id='no-sf' class='btn btn-default'>No, but show me Union Square!</button></p>")
		$('#modal').addClass('show')
	},
	hideModal: function(){
		$('#modal').removeClass('show')
	}
}