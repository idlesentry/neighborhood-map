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
        category: "cafe",
        link: "http://theunioncoffee.com/"
      },
      {
        name: "The Racket", 
        latLng: {lat: 48.747631, lng: -122.477969},
        lat: 48.747631,
        lng: -122.477969,
        address: "1220 N State St, Bellingham, WA 98225",
        category: "bar",
        link: "https://www.facebook.com/theracketbham/"
      },
      {
        name: "Rudy's Pizzeria",
        latLng: {lat: 48.747830, lng: -122.477539},
        lat: 48.747830,
        lng: -122.477539,
        address: "1232 N State St, Bellingham, WA 98225",
        category: "restaurant",
        link: "http://www.rudysbham.com/"
      },
      {
        name: "Avenue Bread",
        latLng: {lat: 48.749717, lng: -122.477788},
        lat: 48.749717,
        lng: -122.477788,
        address: "2301 James St, Bellingham, WA 98225",
        category: "restaurant",
        link: "http://avenuebread.com/"
      }
  ];

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

//           // $('.list li').each(function(i, e) {
//           // $(e).click(function(i) {
//           // return function(e) {
//           //   onChange(gmarkers);
//           // }
//           // }(i));
//           // })


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

//       //attempt to link link to markers
//       this.onChange = function(gmarkers) {
//         document.getElementById('list').onclick = function() {
//           google.maps.event.trigger(gmarkers[i], 'click');
//         }
//       }
//     onChange(gmarkers);
  
//   } //end of for loop

        
// };//end of view function
// view();


var viewModel = function () {
  var self = this;
  // self.listedItems = ko.observableArray([]);

  // for (i = 0; i < locations.length; i++){
  //   self.listedItems.push(locations[i].name);
  // }

  // Build the Google Map object. Store a reference to it.
  self.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.748767, lng: -122.477416},
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
  
  
  // Build Markers via the Maps API and place them on the map.
  self.allPlaces.forEach(function(place) {
    var markerOptions = {
      map: self.googleMap,
      position: place.latLng
    };
    
    place.marker = new google.maps.Marker(markerOptions);

    var infowindow = new google.maps.InfoWindow;

    //gathering
    for (i = 0; i < locationData.length; i++) {
      var latString = JSON.stringify(locationData[i].lat);
      var lngString = JSON.stringify(locationData[i].lng);
      var img = "https://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + latString + ',' + lngString + "";
      // var address = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latString + ',' + lngString + "";

      //this is what will display in the infowindow
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

        place.marker.addListener('click', function() {
      self.googleMap.setZoom(17);
      self.googleMap.setCenter(place.marker.getPosition());
      place.marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function () {
          place.marker.setAnimation(null);
        }, 1500);

      infowindow.setContent(contentString);
      infowindow.open(self.googleMap, place.marker);
    });
    }

    
    // You might also add listeners onto the marker, such as "click" listeners.
  });
  
  
  // This array will contain what its name implies: only the markers that should
  // be visible based on user input. My solution does not need to use an 
  // observableArray for this purpose, but other solutions may require that.
  self.visiblePlaces = ko.observableArray();
  
  
  // All places should be visible at first. We only want to remove them if the
  // user enters some input which would filter some of them out.
  self.allPlaces.forEach(function(place) {
    self.visiblePlaces.push(place);
  });
  
  
  // This, along with the data-bind on the <input> element, lets KO keep 
  // constant awareness of what the user has entered. It stores the user's 
  // input at all times.
  self.userInput = ko.observable('');
  
  
  // The filter will look at the names of the places the Markers are standing
  // for, and look at the user input in the search box. If the user input string
  // can be found in the place name, then the place is allowed to remain 
  // visible. All other markers are removed.
  self.filterMarkers = function() {
    var searchInput = self.userInput().toLowerCase();
    
    self.visiblePlaces.removeAll();
    
    // This looks at the name of each places and then determines if the user
    // input can be found within the place name.
    self.allPlaces.forEach(function(place) {
      place.marker.setVisible(false);
      
      if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
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
    
    // You will save a reference to the Places' map marker after you build the
    // marker:
    this.marker = null;
  }

};

 
ko.applyBindings(new viewModel());

