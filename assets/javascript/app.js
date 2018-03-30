$(document).ready(function () {
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