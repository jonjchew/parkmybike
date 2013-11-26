var Page = {
	init: function(){
		Page.bindSearchButton()
	},
	bindSearchButton: function(){

	},
	setCoordinatesForForm: function(latitude, longitude){
		$('#latitude').val(latitude);
      	$('#longitude').val(longitude);
	}
}