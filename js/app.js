function initMap() {

  //need to convert to JSON and get some sense of how to implement a sidebar or list with more info!
  var locations = [
      ["Copper Hog", 48.749363, -122.476122, "bar"],
      ["Union Cafe", 48.747622, -122.478530, "cafe"],
      ["The Racket", 48.747631, -122.477969, "bar"],
      ["Rudy's Pizzeria", 48.747830, -122.477539, "restaurant"],
      ["Avenue Bread", 48.749717, -122.477788, "restaurant"]
  ];


// var locations = [
//       {
//         name: "Copper Hog",
//         latLng: {lat: 48.749363, lng: -122.476122}, 
//         type: "bar"
//       },
//       {
//         name: "Union Cafe", 
//         latLng: {lat: 48.747622, lng: -122.478530},
//         type: "cafe"
//       },
//       {
//         name: "The Racket", 
//         latLng: {lat: 48.747631, lng: -122.477969},
//         type: "bar"
//       },
//       {
//         name: "Rudy's Pizzeria",
//         latLng: {lat: 48.747830, lng: -122.477539},
//         type: "restaurant"
//       },
//       {
//         name: "Avenue Bread",
//         latLng: {lat: 48.749717, lng: -122.477788},
//         type: "restaurant"
//       }
//   ];


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
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    
    //displays information window when marker is clicked
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
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





//attempt at filtering
  var locationData = ko.utils.parseJson(initMap.locations);

  function Item(name,latLng,category){
    this.name = ko.observable(locations[0]);
    this.category = ko.observable(locations[3]);
  }

  var mappedData = ko.utils.arrayMap(locationData, function(item){
    return new Item(item.name, item.category);
  });

  var viewModel = {
    items: ko.observableArray([]),
    filter: ko.observable()
  };

  //filters visible markers based on input from search box
  viewModel.filteredItems = ko.computed(function() {
    var filter = this.filter();
    if (!filter) {
        return this.items();
    } else {
        return ko.utils.arrayFilter(this.items(), function(item) {
            return ko.utils.stringStartsWith(item.name().toLowerCase(), filter);
        });
    }
  }, viewModel);

  //removes markers that don't match the input from search box
  for (i = 0; i < locations.length; i++) {
    if (locations[i][3] !== viewModel.filteredItems) {
      locations[i].setMap(null);
    }
    else {
      locations[i].setMap(map);
    }
  }
}

var BetterListModel = function () {
    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray(["Fries", "Eggs Benedict", "Ham", "Cheese"]); // Initial items
    this.selectedItems = ko.observableArray(["Ham"]);                                // Initial selection
 
    this.addItem = function () {
        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) // Prevent blanks and duplicates
            this.allItems.push(this.itemToAdd());
        this.itemToAdd(""); // Clear the text box
    };
 
    this.removeSelected = function () {
        this.allItems.removeAll(this.selectedItems());
        this.selectedItems([]); // Clear selection
    };
 
    this.sortItems = function() {
        this.allItems.sort();
    };
};
 
ko.applyBindings(new BetterListModel());
