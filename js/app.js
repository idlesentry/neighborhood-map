function initMap() {

  //need to convert to JSON and get some sense of how to implement a sidebar or list with more info!
  var locations = [
      ["Copper Hog", 48.749363, -122.476122],
      ["Union Cafe", 48.747622, -122.478530],
      ["The Racket", 48.747631, -122.477969],
      ["Rudy's Pizzeria", 48.747830, -122.477539],
      ["Avenue Bread", 48.749717, -122.477788]
  ];

  var myLatLng = {lat: 48.748767, lng: -122.477416};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLatLng
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
  
  marker.addListener('click', toggleBounce);

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}
