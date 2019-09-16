import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-crime-alert',
  templateUrl: './crime-alert.page.html',
  styleUrls: ['./crime-alert.page.scss'],
})
export class CrimeAlertPage implements OnInit {
  map: GoogleMap;
  address:string;
  
  constructor(public navigationService : NavigationService, public events : Events,  public toastCtrl: ToastController,
    private platform: Platform) { }

  // loadMaps() {
  //   this.map = GoogleMaps.create('map_places', {
  //    //....
  //   });
  //   this.UserLocation();
  // }
 
 
  // UserLocation(){
  //   this.map.clear();
 
  //   // Get the location of you
  //   this.map.getMyLocation().then((location: MyLocation) => {
  //     console.log(JSON.stringify(location, null ,2));
 
  //     // Move the map camera to the location with animation
  //     this.map.animateCamera({
  //       target: location.latLng,
  //       zoom: 17,
  //       duration: 5000
  //     });
 
  //     //add a marker
  //     let marker: Marker = this.map.addMarkerSync({
  //       title: '@ionic-native/google-maps plugin!',
  //       snippet: 'This plugin is awesome!',
  //       position: location.latLng,
  //       animation: GoogleMapsAnimation.BOUNCE
  //     });
 
  //     //show the infoWindow
  //     marker.showInfoWindow();
 
  //     //If clicked it, display the alert
  //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //       this.showToast('clicked!');
  //     });
 
  //     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
  //       (data) => {
  //           console.log("Click MAP",data);
  //       }
  //     );
  //   })
  //   .catch(err => {
  //     //this.loading.dismiss();
  //     this.showToast(err.error_message);
  //   });
  // }
  // ////////////////////////

  // UserAlerts(){
  //   this.map.clear();
  //   this.map.getMyLocation().then((location: MyLocation) => {
  //     console.log(JSON.stringify(location, null ,2));
 
  //     // Move the map camera to the location with animation
  //     this.map.animateCamera({
  //       target: location.latLng,
  //       zoom: 17,
  //       duration: 5000
  //     });

  //  //add a marker
  //  let theMarker: Marker = this.map.addMarkerSync({
  //   title: 'Crime-Alert',
  //   snippet: 'Location on Warning of Crimes!',
  //   position: location.latLng,
  //   icon: '\assets\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png'
  // });


  //   theMarker.showInfoWindow();
  //   theMarker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //     this.showToast('clicked!');
  //   });

  //   this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
  //     (data) => {
  //         console.log("Click MAP",data);
  //     }
  //   );
  // })
  // .catch(err => {
  //   //this.loading.dismiss();
  //   this.showToast(err.error_message);
  // });
  // }
 
  // async showToast(message: string) {
  //   let toast = await this.toastCtrl.create({
  //     message: message,
  //     duration: 2000,
  //     position: 'middle'
  //   });
  //   toast.present();
  // }

  
  ngOnInit() {
  }

}
