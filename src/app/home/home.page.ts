import { Component, OnInit, NgZone} from '@angular/core';

import { UsersService } from '../users.service';
import { Router, ChildActivationStart } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { Events, ToastController} from '@ionic/angular';
import {
  Platform
} from '@ionic/angular';
import {
  
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { FirebaseService } from '../firebase.service';
import { database } from 'firebase';

declare var google

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  map: GoogleMap;
  address:string;

  /////////////////////////////////////////////////////////////////////////////////////////////
  user
 
 //////////
 loc =[]
 crimes : Array<any> = []
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
 //
   directionsService
 //////////
 array =[]
 firebaseLoc

 DBLocation = []

Crimeslocations = [
  //  ['Robbery',new google.maps.LatLng ( -26.027056,28.186148)],
  //  ['Robbery',new google.maps.LatLng ( -26.000192,28.207734)], //swazi inn
  //  ['Robbery',new google.maps.LatLng ( -26.036723,28.188513)], // sofaya squatar
  //  ['Murders', new google.maps.LatLng (-28.32813,30.697505)],
  //  ['Robbery',new google.maps.LatLng ( -26.196374, 28.034205)], //mandela bridge
  //  ['Robbery',new google.maps.LatLng ( -26.204136,28.046641)] , // small street jozi
  //  ['muder', new google.maps.LatLng(-26.209551, 28.157613)] //germi
 ];
 
 constructor(public zone: NgZone,public navigationService : NavigationService, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
  private platform: Platform, public firebaseService : FirebaseService) {
  this.checkUserState()
  this.run()
  this.loadLocations()
  console.log("why");

  ////
   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
   this.autocomplete = { input: '' };
   this.autocompleteItems = [];
   this.geocoder = new google.maps.Geocoder;
   this.markers = [];
   ///
  this.calcDistance();
  
}
 
ngOnInit() {
  // Since ngOnInit() is executed before deviceready event,
   // you have to wait the event.
   this.platform.ready();
   this.loadMap();
   this.initMap();
}

  loadMap(){
 
    }

initMap() {
  var map, infoWindow;
  var image = {
    url: 'assets/icon/danger (2).png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
   // anchor: new google.maps.Point(0, 40)
  };
console.log()


  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
    animation: GoogleMapsAnimation.BOUNCE
  });
  infoWindow = new google.maps.InfoWindow;


   // Get the location of you
  if (navigator.geolocation) {
    //this.array =[]
    navigator.geolocation.getCurrentPosition((position)=> {
      var pos=[]
      pos.push({
      location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        });
             ///
      let marker = new google.maps.Marker({
        position: pos[0].location,
        map: map,
        animation: GoogleMapsAnimation.BOUNCE
      });
      this.markers.push(marker);
      map.setCenter(pos[0].location);

          /////// populating our  map with markers  from DB

          this.loadLocations().then(info =>{
            console.log( info.length);
       for( let x = 0; x < info.length; x++ ){
             console.log(info[x]);    
        var  markers = new google.maps.Marker({
          map: map,
          draggable: true,
          position: new google.maps.LatLng(info[x].lat, info[x].lng),
          icon: image,
        });
        console.log(new google.maps.LatLng(info[x].lat, info[x].lng));
        
              console.log(  markers , "vvvv");
             
     google.maps.event.addListener(markers, 'click', ((markers, x) => {
            return() => {
                infoWindow.setContent(info[x].crimeType);
                infoWindow.setPosition(new google.maps.LatLng(info[x].lat, info[x].lng));
                infoWindow.open(map, markers);
                
              }
            })(markers, x));
  
          }
        })

          //////

      infoWindow.setPosition(pos[0]);
      infoWindow.setContent('Your Location.');
      infoWindow.open(map);
      map.setCenter(pos[0]);

      this.array.push(pos[0])
      console.log(this.array, "zzz");
      
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
       if(input[x].location <= 0.5 )
       {
         var description = input[x].desc
          // notification
          console.log("notification", description);
       }
       else{
         console.log("you safe.");
       }
    }
  }

    LandMarks(){
    let result : Array<any> = []
    console.log(  this.loc ,"inside array");
    var temp = 0;
    var  output = []
    var dist = google.maps.geometry.spherical.computeDistanceBetween;
    console.log(dist,"dist");
         /// here
     this.loadLocations().then(data =>{
       console.log( data.length);
       for( let x = 0; x < data.length; x++ ){
        console.log(x);
        
        this.DBLocation.push({
          crimeType: data[x].crimeType,
        location:new google.maps.LatLng(data[x].lat,data[x].lng)
        })
      }

      console.log(this.DBLocation);
        
      for(let y = 0; y < this.DBLocation.length; y++){
        console.log(this.DBLocation[y]);
        console.log(this.array[0], 'running');
        
        temp = +(dist(this.array[0].location,this.DBLocation[y].location)/1000).toFixed(1)
        var pttwo = this.DBLocation[y].crimeType
        output.push({location:temp, desc: pttwo} );
      }
      console.log(output, "output");
      
     })
    
    console.log(this.DBLocation , "dsdsds");
    
    //this.array 
    console.log(this.array, "XXXXX");
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

/////////////////////////////////////////////////////////////////////// end here.
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

    /////

    // fetchCrimeCategories(){
    //   this.result = (this.firebaseService.fetchCrimeCategories())
    //   console.log(this.result);
    // }

  checkUserState(){
    this.events.subscribe('user:loggedOut', (boolean)=>{
      console.log(boolean);
      if(boolean === true){
        this.userService.destroyUserData()
        this.events.publish('user:created', false);
      }
    })
  }
  run(){
    console.log("running");
    this.events.publish('currentPage:home', true)
  }

 async loadLocations(){
   let result :any
   await this.firebaseService.fetchSavedLocations().then(data =>{
     result = data

    console.log(result.length);
   })
   console.log(result);
  //this.LandMarks()
   return  result 
  }

  loadLocationss(){
    // this.firebaseService.fetchSavedLocations().then(data =>{
    //   let result = data
    //   console.log(result);
      
    // })
  }
}
