AngularApp.controller('MapDisplayCtrl', ['$scope', '$http', function ($scope, $http) { 

  var directionsDisplay, directionsService, map;

  //intialize map first time page load for calculate routes
  $scope.getDistance = function() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var india = new google.maps.LatLng(20.593684, 78.96288);
    var mapOptions = { 
      zoom:7, 
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: india
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var control = document.getElementById('panel');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  };

  //Calculate distance and also drow the direction between two location
  $scope.calcRoute = function() {
    $scope.gPlace;
    mapVal = $scope.mapData;
    var start = mapVal.start;  //document.getElementById('start').value;
    var end = mapVal.end; //document.getElementById('end').value;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  google.maps.event.addDomListener(window, 'load', $scope.getDistance);  
  };

  //Give the geolocation(current place of the end user)
  $scope.currentPlace = function() {
    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(41.850033, -87.6500523),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $scope.map.setCenter(pos);

          var marker = new google.maps.Marker({
              position: pos,
              map: $scope.map,
              title: 'My Location',
              icon: '/assets/green-dot.png'
          });

      }), function(error){
        console.log('Unable to get location: ' + error.message);
      };
    }
  }; 

  //Load the maps with the markers from the city table
  $scope.simpleMap = function() {
    $http.get('/api/cities').success(function(data) {
      $scope.cities = data;
      $scope.gPlace;
      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(41.850033, -87.6500523),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

      $scope.markers = [];
      
      var infoWindow = new google.maps.InfoWindow();
      
      $scope.createMarker = function (info){        
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.latitude, info.longitude),
          title: info.cname
        });
        marker.content = '<div class="infoWindowContent">' + info.description + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
          infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);  
      }

      for (i = 0; i < $scope.cities.length; i++){
        $scope.createMarker($scope.cities[i]);
      }

      /*$scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      }*/

    });
  };

 }
]);
