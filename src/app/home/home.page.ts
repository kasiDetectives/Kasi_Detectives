import { AlertController } from '@ionic/angular';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit, NgZone} from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Events, ToastController, Platform, ModalController } from '@ionic/angular';
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
import { Icon } from 'ionicons/dist/types/icon/icon';
import { PopupPage } from '../popup/popup.page';
import { FirebaseService } from '../firebase.service';

declare var google
 var map;
var markers= [];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  


  /////////////////////////////////////////////////////////////////////////////////////////////
  address:string;
  DBLocation=[]
  scheduled=[];
  mySelected
  pic = '\assets\icon\magnifying-glass (10).png'
  user = []
  result = []
  loc =[]
 
  
 message
///
  mapz : any;
  markers : any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  
 

  directionsService
  array = []
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
 
 constructor(public zone: NgZone,public alertController: AlertController,public navigationService : NavigationService,private localNotifications: LocalNotifications, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
  private platform: Platform, public modal : ModalController, public firebaseService : FirebaseService,public  socialSharing: SocialSharing) 
  {
  this.checkUserState()
  this.run()
  this.loadLocations()
  console.log("why");

  ////
   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
   this.autocomplete = { input: '' };
   this.autocompleteItems = [];
 ////
   this.geocoder = new google.maps.Geocoder;
   this.markers = [];

  // result = []
  
   ///
  this.calcDistance();
  ///
  //this.array = [];
 
   /////////////////////////constructor notification start
   
    //notify
    this.platform.ready().then(()=>{
      this.localNotifications.on('click').subscribe(res =>{

        console.log('click: ',res)
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title,res.text,msg)

      });

        this.localNotifications.on('trigger').subscribe(res =>{

          console.log('trigger: ',res)
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title,res.text,msg)

        });

    });
  
   //
   
   this.notifyDanger();
   //////////////////// constructor notification end
}
 ///////// notification start
notifyDanger()
{
// Schedule a single notification
this.localNotifications.schedule({
  id: 1,
  title:'Danger ! ',
  text: 'you are about to enter a high crime zone',
  data:{mydata: 'Highjackings were reported here'},
  sound: this.setSound(),
 trigger: {in: 2, unit: ELocalNotificationTriggerUnit.SECOND},
 foreground: true
});
console.log("hh")

} 
//set sound
setSound() {
  if (this.platform.is('android')) {
    return 'file://assets/sounds/shame.mp3';
  } else {
    return 'file://assets/sounds/bell.mp3';
  }
}
//
showAlert(header,sub,msg)
{

  this.alertController.create({
    header: header,
    subHeader: sub,
    message: msg,
    buttons:['Ok']
  }).then(alert => alert.present());

}
//
   getAll()
   {
   this.localNotifications.getAll().then(res =>{
     this.scheduled =res;

     console.log(res)
   });
   console.log("hh")
   }
   ///////////////////////////notification end

   //deleting marker methods start
    // delete markers on array and on map
    deleteMarkers() {
      this.clearMarkers();
      markers = [];
    }
    //  //set map on all markers
     setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    // //delete markers only on map
     clearMarkers() {
      this.setMapOnAll(null);
    }
    ///deleting marker methods end

  //add marker method start
 /*   addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markers.push(marker)
    }
    */
  //  add marker methodend

ngOnInit() {
  // Since ngOnInit() is executed before deviceready event,
   // you have to wait the event.
   this.platform.ready();
   this.loadMap();
   this.initMap();
}

    loadMap(){
      
    }

//////-----------------------
initMap() {
  var infoWindowMarker;
  var selectedMarker
  var  infoWindow

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17,
    animation: GoogleMapsAnimation.BOUNCE
  });
  infoWindow = new google.maps.InfoWindow;
  infoWindowMarker= new google.maps.InfoWindow;

 
  
// /// map click listener start
map.addListener('dblclick',(event)=>{
//     //delete marker
  this.deleteMarkers() 
//  //delete marker end
  //this.addMarker(event.latLng);
  var marker = new google.maps.Marker({
    position: event.latLng,
    map: map
  });
  markers.push(marker);
  selectedMarker=marker
 console.log(selectedMarker,"first selected marker")

  console.log(event.latLng,"location of new marker")

   ////// listener on marker start

 marker.addListener('click', (event) => {
  infoWindowMarker.open(map,marker);
  infoWindowMarker.setContent(String(event.latLng));
  console.log(marker,"marker selected")
 });

//// listener on marker end
});

// /// map click listener end

////add marker



///add marker



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
        zoom: 17,
        map: map,
        animation: GoogleMapsAnimation.BOUNCE

      });
      this.markers.push(marker);
      map.setCenter(pos[0].location);
          ///
      infoWindow.setPosition(pos[0].location);
      infoWindow.setContent('Your Location.');
      infoWindow.open(map);
      map.setCenter(pos[0].location);
​
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
  infoWindow.open(map);
}

////////////////////////////////////////////////////////////////////////////////
//////////////// Calculating distance
calcDistance () {
  var input=[]
  return new Promise((resolve, reject) => {
    console.log(resolve,"resolve");
    this.LandMarks().then(data =>{
      input.push(data)
  console.log(input,"input");
    for(let x = 0; x < input[0].length; x++){
       if(input[0][x].location <= 0.5 )
       {
         var description = input[0][x].desc
          // notification
          console.log("notification", description);
          this.notifyDanger();
       }
       else{
         console.log("you safe.");
       }
    }
  })
})
  }
​

LandMarks(){

  
  let result : Array<any> = []
  console.log(  this.loc ,"inside array");
  var temp = 0;
  var  output = []
    var dist = google.maps.geometry.spherical.computeDistanceBetween;
       console.log(dist,"dist");
  // result = this.firebaseService.fetchSavedLocations()
  // console.log(this.firebaseService.fetchSavedLocations());
  // console.log(result.length);
  return new Promise((resolve, reject) => {
    this.loadLocations().then(data =>{
     
     console.log( data.length);
     for( let x = 0; x < data.length; x++ ){
      console.log(x);
      
      this.DBLocation.push({
        crimeType: data[x].crimeType,
      location:new google.maps.LatLng(data[x].lat,data[x].lng)
      })
    
    }
​
    console.log(this.DBLocation);
      
    for(let y = 0; y < this.DBLocation.length; y++){
      console.log(this.DBLocation[y]);
      console.log(this.array, 'array')
      console.log(this.array[0].location)
      console.log(this.array[0].location, 'running');
      
      temp = +(dist(this.array[0].location,this.DBLocation[y].location)/1000).toFixed(1)
      var pttwo = this.DBLocation[y].crimeType
      output.push({location:temp, desc: pttwo} );
    }
    console.log(output, "output");
      
 resolve(output)
   })
  
  console.log(this.DBLocation , "dsdsds");
  
  //this.array 
  console.log(this.array, "XXXXX");

  })
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

//////////////////////////////////////////////////////------- end here.
////////////////////////////////////////////////////////////////////////////////////////////////
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
 ​
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
