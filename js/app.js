var locationData = [
      {
        name: "Copper Hog",
        latLng: {lat: 48.749363, lng: -122.476122},
        lat: 48.749363,
        lng: -122.476122,
        address: "1327 N State St, Bellingham, WA 98225",
        category: "bar",
        link: "http://www.thecopperhog.com/"
      },
      {
        name: "Union Cafe",
        latLng: {lat: 48.747622, lng: -122.478530},
        lat: 48.747622,
        lng: -122.478530,
        address: "114 W Magnolia St, Bellingham, WA 98225",
        category: "cafe, coffee",
        link: "http://theunioncoffee.com/"
      },
      {
        name: "The Racket", 
        latLng: {lat: 48.747631, lng: -122.477969},
        lat: 48.747631,
        lng: -122.477969,
        address: "1220 N State St, Bellingham, WA 98225",
        category: "bar, food",
        link: "https://www.facebook.com/theracketbham/"
      },
      {
        name: "Rudy's Pizzeria",
        latLng: {lat: 48.747830, lng: -122.477539},
        lat: 48.747830,
        lng: -122.477539,
        address: "1232 N State St, Bellingham, WA 98225",
        category: "restaurant, food",
        link: "http://www.rudysbham.com/"
      },
      {
        name: "Avenue Bread",
        latLng: {lat: 48.749717, lng: -122.477788},
        lat: 48.749717,
        lng: -122.477788,
        address: "1313 Railroad Ave, Bellingham, WA 98225",
        category: "restaurant, food",
        link: "http://avenuebread.com/"
      },
      {
        name: "Redlight",
        latLng: {lat: 48.745839, lng: -122.481337},
        lat: 48.745839,
        lng: -122.481337,
        address: "1017 N State St, Bellingham, WA 98225",
        category: "bar",
        link: "http://www.redlightbellingham.com/"
      },
      {
      name: "EAT",
      latLng: {lat: 48.748775, lng: -122.480317},
      lat: 48.748775,
      lng: -122.480317,
      address: "1200 Cornwall Ave, Bellingham, WA 98225",
      category: "restaurant, bar, food",
      link: "http://www.4u2eat.com/"
      },
      {
      name: "Old World Deli",
      latLng: {lat: 48.747750, lng: -122.477694},
      lat: 48.747750,
      lng: -122.477694,
      address: "1228 N State St, Bellingham, WA 98225",
      category: "restaurant, food",
      link: "http://www.oldworlddeli1.com/"
      }
  ];


var viewModel = function () {
  var self = this;

  self.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.747713, lng: -122.478874},
    zoom: 17
  });
  
  // Build "Place" objects out of raw place data. It is common to receive place
  // data from an API like FourSquare. Place objects are defined by a custom
  // constructor function you write, which takes what you need from the original
  // data and also lets you add on anything else you need for your app, not
  // limited by the original data.
  self.allPlaces = [];

  locationData.forEach(function(place) {
    self.allPlaces.push(new Place(place));
  });

  var markers = [];
  var infowindow = new google.maps.InfoWindow;
  
  // Creating markers
  self.allPlaces.forEach(function(place) {
  

  for (i = 0; i < locationData.length; i++) {

    var latString = JSON.stringify(locationData[i].lat);
    var lngString = JSON.stringify(locationData[i].lng);

    place.marker = new google.maps.Marker({
      position: locationData[i].latLng,
      map: self.googleMap,
    });
    markers.push(place.marker);

    google.maps.event.addListener(place.marker, 'click', (function(place, i) {
        return function() {

          self.googleMap.setZoom(18);
          self.googleMap.setCenter(locationData[i].latLng);
          // place.marker.setAnimation(google.maps.Animation.BOUNCE);
          //   window.setTimeout(function () {
          //     place.marker.setAnimation(null);
          //   }, 1500);   


          var latString = JSON.stringify(locationData[i].lat);
          var lngString = JSON.stringify(locationData[i].lng);

          var img = "https://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + latString + ',' + lngString + "";

          var address = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latString + ',' + lngString + "";

          var contentString =
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' + locationData[i].name + '</h1>'+
          '<div id="bodyContent">'+
          '<img src=' + img + '>' +
          '<p>' + locationData[i].address + '</p>' +
          '<p> <a href=' + locationData[i].link + '> '+
          'Website</a> ' +
          '</p>' +
          '</div>'+
          '</div>';
          
          infowindow.setContent(contentString);
          infowindow.open(self.googleMap, this);
        };
      })(place, i));

      self.listClick = function(place) {
        google.maps.event.trigger(markers[i],'click');
      };
    } //end of for loop
  
  });
  
  
  // Declaring all places as visible initially
  self.visiblePlaces = ko.observableArray();
  
  self.allPlaces.forEach(function(place) {
    self.visiblePlaces.push(place);
  });
  

  self.userInput = ko.observable('');
  
  // Compares user input to place names and adjusts visibility of markers and list items accordingly
  self.filterMarkers = function() {
    var searchInput = self.userInput().toLowerCase();
    
    self.visiblePlaces.removeAll();
    
    self.allPlaces.forEach(function(place) {
      place.marker.setVisible(false);
      
      if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
        self.visiblePlaces.push(place);
      }
      else if (place.category.toLowerCase().indexOf(searchInput) !== -1) {
        self.visiblePlaces.push(place);
      }
    });
    
    
    self.visiblePlaces().forEach(function(place) {
      place.marker.setVisible(true);
    });
  };
  
  
  function Place(dataObj) {
    this.name = dataObj.name;
    this.latLng = dataObj.latLng;
    this.category = dataObj.category;
    
    this.marker = [];
  }

};

ko.applyBindings(new viewModel());





//initializing map
// function view() {
//   var myLatLng = {lat: 48.748767, lng: -122.477416};

//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 17,
//     center: myLatLng
//   });

//   var gmarkers = [];
//   var infowindow = new google.maps.InfoWindow;

  
//   //creates markers
//   var marker, i;
//   for (i = 0; i < locations.length; i++) {
//     var latString = JSON.stringify(locations[i].lat);
//     var lngString = JSON.stringify(locations[i].lng);

//     marker = new google.maps.Marker({
//       position: new google.maps.LatLng(latString, lngString),
//       map: map,
//       title: locations[i].name
//     });

//     //gathers all markers into an array
//     gmarkers.push(marker);

//     google.maps.event.addListener(marker, 'click', (function(marker, i) {
//         return function() {

//           //zooms and bounces marker upon clicking
//           map.setZoom(17);
//           map.setCenter(marker.getPosition());
//           marker.setAnimation(google.maps.Animation.BOUNCE);
//             window.setTimeout(function () {
//               marker.setAnimation(null);
//             }, 1500);

//           //formatting and gathering address and streetview image for each markers infowindow
          // var img = "https://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + latString + ',' + lngString + "";
          // var address = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latString + ',' + lngString + "";

          // //this is what will display in the infowindow
          // var contentString =
          //   '<div id="content">'+
          //   '<div id="siteNotice">'+
          //   '</div>'+
          //   '<h1 id="firstHeading" class="firstHeading">' + locations[i].name + '</h1>'+
          //   '<div id="bodyContent">'+
          //   '<img src=' + img + '>' +
          //   '<p>' + locations[i].address + '</p>' +
          //   '<p> <a href=' + locations[i].link + '> '+
          //   'Website</a> ' +
          //   '</p>' +
          //   '</div>'+
          //   '</div>';
          
          // infowindow.setContent(contentString);
          // infowindow.open(map, marker);
      //   };
      // })(marker, i));
  
//   } //end of for loop

        
// };//end of view function
// view();


