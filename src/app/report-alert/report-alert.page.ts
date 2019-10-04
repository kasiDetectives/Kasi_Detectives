
 import { Component, OnInit, NgZone} from '@angular/core';

import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { Events, ToastController, Platform } from '@ionic/angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 Marker,
 GoogleMapsAnimation,
 MyLocation,
 LatLng,
 GoogleMapOptions
} from '@ionic-native/google-maps';

declare var google

@Component({
 selector: 'app-report-alert',
 templateUrl: './report-alert.page.html',
 styleUrls: ['./report-alert.page.scss'],
})
export class ReportAlertPage implements OnInit {
 map: GoogleMap;
 address:string;
 user

//////////
loc =[]
mySelected : string = ""
////

 message
///
  mapz : any;
  markers : any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;

  ////////
  array : any;
 
 // start; end
  directionsService
//////////
Crimeslocations = [
  ['Robbery',new google.maps.LatLng ( -26.027056,28.186148)],
  ['Robbery',new google.maps.LatLng ( -26.000192,28.207734)], //swazi inn
  ['Robbery',new google.maps.LatLng ( -26.036723,28.188513)], // sofaya squatar
  ['Murders', new google.maps.LatLng (-28.32813,30.697505)],
  ['Robbery',new google.maps.LatLng ( -26.196374, 28.034205)], //mandela bridge
  ['Robbery',new google.maps.LatLng ( -26.204136,28.046641)] , // small street jozi
  ['muder', new google.maps.LatLng(-26.209551, 28.157613)] //germi
];



 constructor(public zone: NgZone,public navigationService : NavigationService, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
   private platform: Platform) {
   console.log("why");
   this.checkState()
   this.events.publish('currentPage:home', false)

   ////
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  ////
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

    ///
   this.calcDistance();
   ///
   this.array = [];
   console.log(this.array, "ooo");
   
 }

 

 ngOnInit() {
   // Since ngOnInit() is executed before deviceready event,
    // you have to wait the event.
    this.platform.ready();
    this.loadMap();
    this.initMap();
}
 checkState(){
   this.user = this.userService.returnUserProfile()
   console.log(this.user);
   if(this.user[0] ===undefined){
     console.log(true);
     this.router.navigate(['/login'])
   }
 }
 /////
   loadMap() {

       /// default location if user didn't allow Location!
    //  this.map = GoogleMaps.create('map_canvas', {
    //    center: {lat:-26.024472, lng: 28.185799},
    //    zoom: 17,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //  });
////////////////////////////////////////////////////////////////// start here
///////////////////// array of Markers to Use
// let map = new google.maps.Map(document.getElementById('map_canvas'), {
//     zoom: 12,
//     center: new google.maps.LatLng(-26.027056,28.186148),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
// });

// let infowindow = new google.maps.InfoWindow;

// let marker, i;

// for (i = 0; i < this.Crimeslocations.length; i++) {  
//    marker = new google.maps.Marker({
//         position: new google.maps.LatLng(this.Crimeslocations[i][1], this.Crimeslocations[i][2]),
//         map: map
//    });

//    google.maps.event.addListener(marker, 'click', ((marker, i) => {
//         return() => {
//             infowindow.setContent(this.Crimeslocations[i][0]);
//             infowindow.open(map, marker);
//         }
//    })(marker, i));
//    }
   ////////////////////////////////////////////////////////////////////////// end here
}

//////-----------------------
initMap() {
  var map, infoWindow;
  var marker1, marker2, i;

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
    animation: GoogleMapsAnimation.BOUNCE
  });
  infoWindow = new google.maps.InfoWindow;


/////////// tryin to insert markers
for (i = 0; i < this.Crimeslocations.length; i++) {  
  console.log(this.Crimeslocations.length, "weewewew");
  
marker1 = new google.maps.Marker({
  map: map,
  draggable: true,
  position: new google.maps.LatLng(this.Crimeslocations[i][1], this.Crimeslocations[i][2]),
  //position: {lat: 40.714, lng: -74.006},
  animation: GoogleMapsAnimation.BOUNCE
});

google.maps.event.addListener(marker1, 'click', ((marker1, i) => {
  return() => {
    infoWindow.setContent(this.Crimeslocations[i][0]);
    infoWindow.open(map, marker1);
  }
})(marker1, i));
}
/////////---------------
marker2 = new google.maps.Marker({
  map: map,
  draggable: true,
  position: {lat: 48.857, lng: 2.352},
  animation: GoogleMapsAnimation.BOUNCE
});
///////

   // Get the location of you
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=> {
      this.array = [];
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location.');
      infoWindow.open(map);
      map.setCenter(pos);

      this.array.push(pos)
     
      console.log(this.array, "zzz");
      return
      
    }, () => {
      this.handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    this.handleLocationError(false, infoWindow, map.getCenter());
  }
}

handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(this.map);
}

////////////////////////////////////////////////////////////////////////////////
//////////////// Calculating distance
calcDistance () {
  var input= this.LandMarks()
    for(let x = 0; x < input.length; x++){
       if(input[x] <= 0.5 )
       {
          // notification
          console.log("notification");
       }
       else{
         console.log("you safe.");
       }
    }
  }

  LandMarks(){
      // below manually insert user location
      this.loc =  ['Ewc', new google.maps.LatLng(-26.209469, 28.157037)];
    // insert with user location from geo

      console.log(this.loc,"inside array");
      var temp = 0;
      var  output = []
        var dist = google.maps.geometry.spherical.computeDistanceBetween;
           console.log(dist,"dist");
           console.log(this.array,"array");
           console.log(this.Crimeslocations,"crimeArray");

      this.Crimeslocations.forEach((pt)=>{
            temp = +(dist(this.loc[1],pt[1])/1000).toFixed(1)
            output.push(temp);
         console.log(output, "output");
          });
          return output
 }

 ////////////////////////  getting different places
updateSearchResults(){
  console.log(this.autocomplete.input);
  
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  /////////////////////////// selecting a particular place
selectSearchResult(item){
   this.clearMarkers();
   this.autocompleteItems = [];

    //Set latitude and longitude of user place
    this.mapz = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {lat: -34.075007, lng: 20.23852},
      zoom: 15
    });
 
   this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
     if(status === 'OK' && results[0]){
       let position = {
           lat: results[0].geometry.location.lat,
           lng: results[0].geometry.location.lng
       };
 
       let marker = new google.maps.Marker({
         position: results[0].geometry.location,
         map: this.mapz,
       });
       this.markers.push(marker);
       this.mapz.setCenter(results[0].geometry.location);
     }
   })
 }

 clearMarkers(){
  for (var i = 0; i < this.markers.length; i++) {
    console.log(this.markers[i])
    this.markers[i].setMap(null);
  }
  this.markers = [];
}
//////////////////////////////////////////////////////------- end here.
////////////////////////////////////////////////////////////////////////////////////////////////

 getMaps(){
   return this.map;
 }
 ///////////// start here
  ModeMap() {
  let pointA = new google.maps.LatLng(-26.027056,28.186148),
    pointB = new google.maps.LatLng(51.5379, 0.7138),
    center = new google.maps.LatLng(51.3, 0.8),
    myOptions = {
      zoom: 8,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),

    outputAtoB = document.getElementById('a2b'),
    flightPath = new google.maps.Polyline({
      path: [pointA, pointB],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

//   // click on marker B to get route from A to B
   this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, outputAtoB);

  let travelMode = document.getElementById('Travel_mode');
  travelMode.addEventListener("change", ()=> {
    console.log(travelMode);
    
//     if (travelMode.value == "AIR") {
      
//       directionsDisplay.setMap(null);
//       directionsDisplay.setOptions({
//         suppressPolylines: true
//       });
//       directionsDisplay.setMap(map);
//       let distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
//       outputAtoB.innerHTML = Math.round(distance / 1000) + "Km";
//       flightPath.setMap(map);
//     } else {
//       flightPath.setMap(null);
//       directionsDisplay.setOptions({
//         suppressPolylines: false
//      });
//  // calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, outputAtoB);
//      }

  });
}


 calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, outputTxt) {
  let selectedMode = document.getElementById('Travel_mode')["value"];

  directionsService.route({
    origin: pointA,
    destination: pointB,
    unitSystem: google.maps.UnitSystem.METRIC,
    travelMode: google.maps.TravelMode[selectedMode]
  },(response, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      outputTxt.innerHTML = Math.round(directionsDisplay.getDirections().routes[directionsDisplay.getRouteIndex()].legs[0].distance.value / 1000) + "Km";
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

////
  getmode(event) {
    this.mySelected = event.detail.value
  console.log(this.mySelected);
}

}