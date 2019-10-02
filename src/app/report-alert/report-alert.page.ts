import { Component, OnInit, NgZone} from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
 LatLng
} from '@ionic-native/google-maps';
import { Icon } from 'ionicons/dist/types/icon/icon';
import { FirebaseService } from '../firebase.service';
import {ModalController} from '@ionic/angular' 
declare var google

@Component({
 selector: 'app-report-alert',
 templateUrl: './report-alert.page.html',
 styleUrls: ['./report-alert.page.scss'],
})
export class ReportAlertPage implements OnInit {
  ///////////////////
  ///////////////////
  //////////////////
  map: GoogleMap;
  address:string;

  pic = '\assets\icon\magnifying-glass (10).png'
  user = []
  result = []

  mapz : any;
  markers : any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  Crimeslocations = []
  constructor(public socialSharing:SocialSharing, private modal:ModalController,public navigationService : NavigationService, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
    private platform: Platform, public zone: NgZone, public firebaseService : FirebaseService) {
      console.log("why");
      this.checkState()
      this.events.publish('currentPage:home', false)
      this.fetchCrimeCategories()
   
      ////
       this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
       this.autocomplete = { input: '' };
       this.autocompleteItems = [];
     ////
       this.geocoder = new google.maps.Geocoder;
       this.markers = [];
  }

  tweet()
  {
    this.socialSharing.shareViaTwitter('A crime has been reported',this.pic,'').then(() =>
    {

    }).catch(() =>
    {

    })
}
  

  ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
     // you have to wait the event.
     this.platform.ready();
     this.loadMap();

this.Crimeslocations = [
  ['Robbery', -26.027056,28.186148],
  ['Robbery', -26.000192,28.207734], //swazi inn
  ['Robbery', -26.036723,28.188513], // sofaya squatar
  ['Murders', -28.32813,30.697505],
  ['Robbery', -26.196374, 28.034205], //mandela bridge
  ['Robbery', -26.204136,28.046641]  // small street jozi
];
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
     this.map = GoogleMaps.create('map_canvas', {
       center: {lat:-26.024472, lng: 28.185799},
       zoom: 17,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }
     );

  /// get user location
     this.goToMyLocation();
  
////////////////////////////////////////////////////////////////// start here
// array of Markers to Use
let map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(-26.027056,28.186148),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

let infowindow = new google.maps.InfoWindow;

let marker, i;

for (i = 0; i < this.Crimeslocations.length; i++) {  
   marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.Crimeslocations[i][1], this.Crimeslocations[i][2]),
        map: map
   });

   google.maps.event.addListener(marker, 'click', ((marker, i) => {
        return() => {
            infowindow.setContent(this.Crimeslocations[i][0]);
            infowindow.open(map, marker);
        }
   })(marker, i));
}

//////

/////


   }
  ///// Don't temper with main map display
   goToMyLocation(){
     this.map.clear();
     // Get the location of you
     this.map.getMyLocation().then((location: MyLocation) => {
       console.log(JSON.stringify(location, null ,2));
       // Move the map camera to the location with animation
       this.map.animateCamera({
         target: location.latLng,
         zoom: 17,
         duration: 5000
       });
       //add a marker
       let marker: Marker = this.map.addMarkerSync({
         title: 'User-Location',
         snippet: 'This awesome!',
         position: location.latLng,             // this is initial user location
         animation: GoogleMapsAnimation.BOUNCE
       });
       //show the infoWindow
       marker.showInfoWindow();
       //If clicked it, display the alert
       marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
         this.showToast('clicked!');
       });
       this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
         (data) => {
             console.log("Click MAP",data);
         }
       );
     })
     .catch(err => {
       //this.loading.dismiss();
       this.showToast(err.error_message);
     });
     this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
       (data) => {
           console.log("Click MAP",data);
       }
     );
   }
async showToast(message: string) {
     let toast = await this.toastCtrl.create({
       message: message,
       duration: 2000,
       position: 'middle'
     });
     toast.present();
   }

   //////////////// Calculating distance 
   
  //  Location locationA = new Location("point A");  
  //  locationA.setLatitude(location.getLatitude());  
  //  locationA.setLongitude(location.getLongitude());  
  //  Location locationB = new Location("point B");  
  //  locationB.setLatitude(lat2);  
  //  locationB.setLongitude(lng2);  
  //  distance = locationA.distanceTo(locationB);
  //  Log.v("log", "distance "+distance);



    // let myLatLng1 = { lat: 40.634315, lng: 14.602552 };
    // let myLatLng2 = {lat: 40.04215, lng: 14.102552 };
    // google.maps.geometry.spherical.computeDistanceBetween(myLatLng1, myLatLng2);



   calcDistance (fromLat, fromLng, toLat, toLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
 }

////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////  getting different places
updateSearchResults(){
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

 fetchCrimeCategories(){
    this.result = this.firebaseService.addOther()
    //this.result.push("Other")
  
  
  console.log(this.result);
}

// openPopUp(lat, lng){
//   console.log(lat);
//   console.log(lng);
  
//   ////
  
// }

openPopup(){
  const myData={

  }
  const myPopup = this.modal.create('PopupPage');
  myPopup.catch;
}
  getCurrentSessionUser(){
    this.user = this.userService.readCurrentSession()
    console.log(this.user);
    
  }
}