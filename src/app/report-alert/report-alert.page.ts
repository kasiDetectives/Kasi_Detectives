import { Component, OnInit , NgZone} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
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
  MyLocation
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

  
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;

  constructor( public zone: NgZone, public geolocation: Geolocation,public navigationService : NavigationService, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
    private platform: Platform) {
    console.log("why");
    this.checkState()
    this.events.publish('currentPage:home', false)
    ////
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
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
        // camera: {
        //   target: {
        //     lat: 43.0741704,
        //     lng: -89.3809802
        //   },
        //   zoom: 18,
        //   tilt: 30
        // }
      });
      this.goToMyLocation();
      //this.crimeMark(this.map);
      
    }
   
   
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
          title: '@ionic-native/google-maps plugin!',
          snippet: 'This plugin is awesome!',
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

    // crimeMark(map: any){
    //     let theMarker: Marker = this.map.addMarkerSync({
    //        map : map,
    //        title: 'Crime-Alert',
    //        snippet: 'Location on Warning of Crimes!',
    //        position: map,
    //        //icon: '\assets\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png'
    //      });

    //           //show the infoWindow
    //        theMarker.showInfoWindow();

    //           //If clicked it, display the alert
    //       theMarker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //       this.showToast('clicked!');
    //     });
   
    //     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
    //       (data) => {
    //           console.log("Click MAP",data);
    //       }
    //     );
    // }
  ////////////////////////

// updateSearchResults(){
//     if (this.autocomplete.input == '') {
//       this.autocompleteItems = [];
//       return;
//     }
//     this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
//     (predictions, status) => {
//       this.autocompleteItems = [];
//       this.zone.run(() => {
//         predictions.forEach((prediction) => {
//           this.autocompleteItems.push(prediction);
//         });
//       });
//     });
//   }

  
// selectSearchResult(item){
//  // this.clearMarkers();
//   this.autocompleteItems = [];

//   this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
//     if(status === 'OK' && results[0]){
//       let position = {
//           lat: results[0].geometry.location.lat,
//           lng: results[0].geometry.location.lng
//       };
//       let marker = new google.maps.Marker({
//         position: results[0].geometry.location,
//         map: this.map,
//       });
//       this.markers.push(marker);
//       this.map.setCameraTarget(results[0].geometry.location);
//     }
//   })
// }

  // selectSearchResult(item){
  //   this.autocompleteItems = [];
  
  //   this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
  //     if(status === 'OK' && results[0]){
  //       this.autocompleteItems = [];
  //       this.GooglePlaces.nearbySearch({
  //         location: results[0].geometry.location,
  //         radius: '500',
  //         types: ['restaurant'],
  //         // key: 'YOUR_KEY_HERE'
  //       }, (near_places) => {
  //           this.zone.run(() => {
  //             this.nearbyItems = [];
  //             for (var i = 0; i < near_places.length; i++) {
  //               this.nearbyItems.push(near_places[i]);
  //             }
  //         });
  //       })
  //     }
  //   })
  // }

}