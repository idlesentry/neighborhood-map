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

  var infowindow = new google.maps.InfoWindow;
  
 
  self.allPlaces.forEach(function(place) {

     // Creating markers
    place.marker = new google.maps.Marker({
      position: place.latLng,
      map: self.googleMap,
    });

    //click event for map
    google.maps.event.addListener(place.marker, 'click', (function(place) {
        return function() {

          //making coordinates into strings to be able to use in addresses for image and address
          var latString = JSON.stringify(place.lat);
          var lngString = JSON.stringify(place.lng);
          var img = "https://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + latString + ',' + lngString + "";
          var address = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latString + ',' + lngString + "";

          //setting content that will show in the infowindow
          var contentString =
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' + place.name + '</h1>'+
          '<div id="bodyContent">'+
          '<img src=' + img + '>' +
          '<p>' + place.address + '</p>' +
          '<p> <a href=' + place.link + '> '+
          'Website</a> ' +
          '</p>' +
          '</div>'+
          '</div>';
          
          infowindow.setContent(contentString);
          infowindow.open(self.googleMap, this);

          self.googleMap.setZoom(18);
          self.googleMap.setCenter(place.marker.getPosition());
          place.marker.setAnimation(google.maps.Animation.BOUNCE);
            window.setTimeout(function () {
              place.marker.setAnimation(null);
            }, 1500);   
        };
      })(place)); //end of for loop 
  }); //end of self.allplaces.foreach
  
  //click event for list
  self.listClick = function(place) {
    google.maps.event.trigger(place.marker,'click');
  };
  
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
    this.address = dataObj.address;
    this.link = dataObj.link;
    this.lat = dataObj.lat;
    this.lng = dataObj.lng;
    this.marker = ko.observableArray();
  }

};

ko.applyBindings(new viewModel());


