
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
 LatLng
} from '@ionic-native/google-maps';
import { Icon } from 'ionicons/dist/types/icon/icon';

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

  mapz : any;
  markers : any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;

//////////
   nearbyItems = [];

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
 }
 ngOnInit() {
   // Since ngOnInit() is executed before deviceready event,
    // you have to wait the event.
    this.platform.ready();
    this.loadMap();
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
      // mapTypeId: 'roadmap'
     }
     );

  /// get user location
     this.goToMyLocation();
      ///// for warnings
      this.WarnMarker(location);
      /////////
      this.MarksIn(this.map)
       ////////
       this.Markerz(this.map)

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
         position: location.latLng,
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


   ///////////////////
    MarksIn(map){
     //add a marker
     let markerZA: Marker = this.map.addMarkerSync({
       title: 'Crime-Scene',
       snippet: 'Gang Rapes!',
       position: {lat: -28.32813, lng: 30.697505},
       animation: GoogleMapsAnimation.DROP,
       map:map
     });
     //show the infoWindow
     markerZA.showInfoWindow();
  }
  //////////////
  Markerz(map){
   //add a marker
   let markerZA: Marker = this.map.addMarkerSync({
     title: 'Crime-Scene',
     snippet: 'Gang Rapes!',
     position: {lat: -28.405467, lng: 23.270747},
     animation: GoogleMapsAnimation.DROP,
     map:map
   });
   //show the infoWindow
   markerZA.showInfoWindow();
}
    ///////
    WarnMarker(map){
      let warmMark : Marker = this.map.addMarkerSync({
         title : 'User-Warning',
         snippet: 'Car-Hijackings!',
         position:{ lat: -34.9011, lng: -56.1645 } ,
         map:map
      })
      warmMark.showInfoWindow();
    }

 ////////  getting different places
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
  // this.clearMarkers();
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

//  clearMarkers(){
//   for (var i = 0; i < this.markers.length; i++) {
//     console.log(this.markers[i])
//     this.markers[i].setMap(null);
//   }
//   this.markers = [];
// }
//////////////////////////////////////////////////////------- end here.
////////////////////////////////////////////////////////////////////////////////////////////////

 getMaps(){
   return this.map;
 }

}