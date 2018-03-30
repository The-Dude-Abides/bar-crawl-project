$(document).ready(function () {    
    var map;
    var service;
    var infowindow;
    
    function initialize() {
      var denver = new google.maps.LatLng(39.742043, -104.991531);
    
      map = new google.maps.Map(document.getElementById('map'), {
          center: denver,
          zoom: 14
        });
    
      var request = {
        location: denver,
        radius: '1000',
        query: 'trivia'
      };
    
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);

      infowindow = new google.maps.InfoWindow();
      
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        })};
    
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    }

  google.maps.event.addDomListener(window, 'load', initialize);

  var weatherAPIKey = "5dd2a3eaffbc2b464e3e24b8a9a82bb7";

  // Here we are building the URL we need to query the database
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Denver,Colorado&appid=${weatherAPIKey}`;

  // We then created an AJAX call
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {

      console.log(response);
      $('.city').append(response.name);
      $('.wind').append(`Wind Speed: ${response.wind.speed} MPH`);
      $('.humidity').append(`Humidity: ${response.main.humidity}%`);
      var temp = Math.floor(((response.main.temp - 273.15) * 1.8) + 32);
      $('.temp').append(`Tempature: ${temp}℉`);
  });

  $('#tacos').on('click', () => {
    console.log('I want tacos!');

    var markerLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    var initMap = () => {
      var myLatLng = {
        lat: 39.753101,
        lng: -104.999082
      };

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        label: markerLabels[labelIndex++ % markerLabels.length],
        map: map
      });
    };

    initMap();

  });

  $('#thirsty').on('click', () => {
    console.log('I\'m thirsty!');

    var markerLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    var initMap = () => {
      var myLatLng = {
        lat: 39.754478,
        lng: -104.995178
      };

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        label: markerLabels[labelIndex++ % markerLabels.length],
        map: map
      });
    };

    initMap();

  });

  $('#happy').on('click', () => {
    console.log('I want to pay for cheap beer!');

    var markerLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    var initMap = () => {
      var myLatLng = {
        lat: 30.310133,
        lng: -95.456260
      };

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        label: markerLabels[labelIndex++ % markerLabels.length],
        map: map
      });
    };

    initMap();

  });

  $('#trivia').on('click', () => {
    console.log('I\'m feeling smart!');

    var markerLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    var initMap = () => {
      var myLatLng = {
        lat: 39.757525,
        lng: -104.990393
      };
      
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        label: markerLabels[labelIndex++ % markerLabels.length],
        map: map
      });
    };

    initMap();

  });


    // function initAutocomplete() {
    //     var map = new google.maps.Map($('#map'), {
    //         center: { lat: 39.7392, lng: -104.9903 },
    //         zoom: 13,
    //         mapTypeId: 'roadmap'
    //     });

    //     // Create the search box and link it to the UI element.
    //     var input = document.getElementById('pac-input');
    //     var searchBox = new google.maps.places.SearchBox(input);
    //     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    //     // Bias the SearchBox results towards current map's viewport.
    //     map.addListener('bounds_changed', function () {
    //         searchBox.setBounds(map.getBounds());
    //     });

    //     var markers = [];
    //     // Listen for the event fired when the user selects a prediction and retrieve
    //     // more details for that place.
    //     searchBox.addListener('places_changed', function () {
    //         var places = searchBox.getPlaces();

    //         if (places.length == 0) {
    //             return;
    //         }

    //         // Clear out the old markers.
    //         markers.forEach(function (marker) {
    //             marker.setMap(null);
    //         });
    //         markers = [];

    //         // For each place, get the icon, name and location.
    //         var bounds = new google.maps.LatLngBounds();
    //         places.forEach(function (place) {
    //             if (!place.geometry) {
    //                 console.log("Returned place contains no geometry");
    //                 return;
    //             }
    //             var icon = {
    //                 url: place.icon,
    //                 size: new google.maps.Size(71, 71),
    //                 origin: new google.maps.Point(0, 0),
    //                 anchor: new google.maps.Point(17, 34),
    //                 scaledSize: new google.maps.Size(25, 25)
    //             };

    //             // Create a marker for each place.
    //             markers.push(new google.maps.Marker({
    //                 map: map,
    //                 icon: icon,
    //                 title: place.name,
    //                 position: place.geometry.location
    //             }));

    //             if (place.geometry.viewport) {
    //                 // Only geocodes have viewport.
    //                 bounds.union(place.geometry.viewport);
    //             } else {
    //                 bounds.extend(place.geometry.location);
    //             }
    //         });
    //         map.fitBounds(bounds);
    //     });
    //     service.getDetails({
    //         placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    //     }, function (place, status) {
    //         if (status === google.maps.places.PlacesServiceStatus.OK) {
    //             var marker = new google.maps.Marker({
    //                 map: map,
    //                 position: place.geometry.location
    //             });
    //             google.maps.event.addListener(marker, 'click', function () {
    //                 infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    //                     'Place ID: ' + place.place_id + '<br>' +
    //                     place.formatted_address + '</div>');
    //                 infowindow.open(map, this);
    //             });
    //         }
    //     });
    //     marker.addListener('click', function () {
    //         map.setZoom(8);
    //         map.setCenter(marker.getPosition());
    //     });
    // }


    // var directionsService = new google.maps.DirectionsService();
    // var directionsDisplay = new google.maps.DirectionsRenderer();

    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom:12,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    // directionsDisplay.setMap(map);
    // directionsDisplay.setPanel(document.getElementById('panel'));

    // var request = {
    //   origin: 'denver, CO', 
    //   destination: 'boulder, CO',
    //   travelMode: google.maps.DirectionsTravelMode.WALKING,
    // //   alternatives: true
    // };

    // directionsService.route(request, function(response, status) {
    //   if (status == google.maps.DirectionsStatus.OK) {
    //     directionsDisplay.setDirections(response);
    //   }
    // });

    // var map;
    // var service;
    // var infowindow;

    // function initialize() {
    //     var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: pyrmont,
    //         zoom: 15
    //     });

    //     var request = {
    //         location: pyrmont,
    //         radius: '500',
    //         query: 'restaurant'
    //     };

    //     service = new google.maps.places.PlacesService(map);
    //     service.textSearch(request, callback);
    // }

    // function callback(results, status) {
    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         for (var i = 0; i < results.length; i++) {
    //             var place = results[i];
    //             createMarker(results[i]);
    //         }
    //     }
    // }
    });