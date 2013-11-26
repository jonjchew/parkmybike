var GoogleMaps = {
  initialize: function(){
    var mapOptions = {
    zoom: 15
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude

        var pos = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
          map: map,
          position: pos,
          content: 'Location found using HTML5.'
        });

        Page.setCoordinatesForForm(latitude, longitude)

        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  },
  handleNoGeolocation: function(errorFlag){
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
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
      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    }
  }
}
