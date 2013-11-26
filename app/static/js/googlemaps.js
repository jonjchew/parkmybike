var GoogleMaps = {
  origin: null,
  initialize: function(){
    var mapOptions = {
    zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();
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

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  },
  addMarkers: function(coordinatesArray){
    markers = []
    for (var i = 0; i < coordinatesArray.length; i++) 
    {
      var latitude = coordinatesArray[i][0]
      var longitude = coordinatesArray[i][1]
      var pos = new google.maps.LatLng(latitude, longitude)
      if(coordinatesArray[i][2]!='_undetermined'){
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: coordinatesArray[i][2],
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

      google.maps.event.addListener(marker, 'click', function() {
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
