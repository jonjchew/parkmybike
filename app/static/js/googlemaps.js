var GoogleMaps = {
  origin: null,
  initialize: function(){
    var mapOptions = {
    zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude

        GoogleMaps.origin = new google.maps.LatLng(latitude, longitude)
        var marker = new google.maps.Marker({
          map: map,
          position: GoogleMaps.origin,
          icon: '/static/images/penguin.png',
          zIndex: 202
        });
        map.setCenter(GoogleMaps.origin);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  },
  handleNoGeolocation: function(){
    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
    };

    Page.showNoGeo()
    map.setCenter(options.position);
  },
  addMarkers: function(responseArray){
    markers = []
    for (var i = 0; i < responseArray.length; i++) 
    {
      var latitude = responseArray[i]['latitude']
      var longitude = responseArray[i]['longitude']
      var pos = new google.maps.LatLng(latitude, longitude)
      if(responseArray[i]['name']!='_undetermined'){
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: responseArray[i]['name'],
          icon: '/static/images/bike-icon.png',
          zIndex: 200
        })
      }
      else{
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: '/static/images/bike-icon.png',
          zIndex: 200
        });
      }

      google.maps.event.addListener(marker, 'touch', function() {
        Page.removeInstructions()
        var destination = this.getPosition()
        GoogleMaps.calcRoute(GoogleMaps.origin, destination);
      });
      google.maps.event.addListener(marker, 'mousedown', function() {
        Page.removeInstructions()
        var destination = this.getPosition()
        GoogleMaps.calcRoute(GoogleMaps.origin, destination);
      });
    }
  },
  calcRoute: function(start, end){
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  },
  recenterMap: function(data){
    var origin = new google.maps.LatLng(data.latitude,data.longitude)
    GoogleMaps.origin = origin
    var marker = new google.maps.Marker({
      map: map,
      position: GoogleMaps.origin,
      icon: '/static/images/penguin.png',
      zIndex: 200
    });
    map.setCenter(origin)
  }
}
