var locations = [
      {
        name: "Copper Hog",
        lat: 48.749363 , 
        lng:-122.476122,
        type: "bar"
      },
      {
        name: "Union Cafe", 
        lat: 48.747622 , 
        lng: -122.478530,
        type: "cafe"
      },
      {
        name: "The Racket", 
        lat: 48.747631 , 
        lng: -122.477969,
        type: "bar"
      },
      {
        name: "Rudy's Pizzeria",
        lat: 48.747830 , 
        lng: -122.477539,
        type: "restaurant"
      },
      {
        name: "Avenue Bread",
        lat: 48.749717 , 
        lng: -122.477788,
        type: "restaurant"
      }
  ];


function initMap() {
  var myLatLng = {lat: 48.748767, lng: -122.477416};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) { 
    //iterates each marker from array of locations
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map
    });
    
    //displays information window when marker is clicked
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(selection);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
}


var BetterListModel = function () {
  this.filteredItem = ko.observable("");

  var names = ko.observableArray();

  for (i = 0; i < locations.length; i++){
    names.push(locations[i].name);
  }

  this.allItems = names;
};
 
ko.applyBindings(new BetterListModel());
