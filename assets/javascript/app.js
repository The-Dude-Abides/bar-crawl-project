$(document).ready(function () {
    function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 39.7392, lng: -104.9903 },
            zoom: 13,
            mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
        service.getDetails({
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                        'Place ID: ' + place.place_id + '<br>' +
                        place.formatted_address + '</div>');
                    infowindow.open(map, this);
                });
            }
        });
        marker.addListener('click', function () {
            map.setZoom(8);
            map.setCenter(marker.getPosition());
        });
    };

    function initialize() {
        // Create a map to show the results, and an info window to
        // pop up if the user clicks on the place marker.
        var pyrmont = new google.maps.LatLng(39.7392, -104.9903);
      
        var map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15,
          scrollwheel: false
        });
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
      
        document.getElementById('submit').addEventListener('click', function() {
          placeDetailsByPlaceId(service, map, infowindow);
        });
      }
      
      function placeDetailsByPlaceId(service, map, infowindow) {
        // Create and send the request to obtain details for a specific place,
        // using its Place ID.
        var request = {
          placeId: document.getElementById('place-id').value
        };
      
        service.getDetails(request, function (place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            // If the request succeeds, draw the place location on the map
            // as a marker, and register an event to handle a click on the marker.
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
      
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
      
            map.panTo(place.geometry.location);
          }
        });
      }
      
      // Run the initialize function when the window has finished loading.
      google.maps.event.addDomListener(window, 'load', initialize);
      
    var APIKey = "5dd2a3eaffbc2b464e3e24b8a9a82bb7";

    // Here we are building the URL we need to query the database
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Denver,Colorado&appid=${APIKey}`;

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $('.city').append(response.name);
        $('.wind').append("Wind Speed: " + response.wind.speed + " MPH");
        $('.humidity').append("Humidity " + response.main.humidity);
        var temp = Math.floor(((response.main.temp - 273.15) * 1.8) + 32);
        $('.temp').append(`Tempature: ${temp}f`);
    });
});