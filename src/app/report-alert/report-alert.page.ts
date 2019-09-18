import { Component, OnInit } from '@angular/core';

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


@Component({
  selector: 'app-report-alert',
  templateUrl: './report-alert.page.html',
  styleUrls: ['./report-alert.page.scss'],
})
export class ReportAlertPage implements OnInit {
  map: GoogleMap;
  address:string;

  user
  constructor(public navigationService : NavigationService, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
    private platform: Platform) {
    console.log("why");
    this.checkState()
    this.events.publish('currentPage:home', false)
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
        center: {lat: 59.325, lng: 18.070},
        zoom: 17,
        mapTypeId: 'roadmap'
      }
      );

      
      document.addEventListener('click', (map: any) => {
        console.log("document clicked");
        console.log(map);
        console.log(map.target);
       this.MarkAlerts(location, map)
       console.log("xxx");
       
      });

     ////////////////////////////// adding custom icons

     let icon

    //   let icons = {
    //   warnings: {
    //    icon: '\assets\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (1).png'
    //   },
    //   HighRisk: {
    //    icon: '\assets\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (9).png'
    //      }
    //  };

      /////////


     // this.map = GoogleMaps.create('map_canvas', {
        // camera: {
        //   target: {
        //     lat: 43.0741704,
        //     lng: -89.3809802
        //   },
        //   zoom: 18,
        //   tilt: 30
        // }
    //  });

        /// get user location
      this.goToMyLocation();

       ///// for warnings
       this.WarnMarker(location);

        /////
     this.initAutocomplete()   
    }
   
   ////////////////////////////////// Don't temper with main map display /////////
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
    ///////////////////////////////////////////////////////////////////////////////////////


    MarkAlerts(location, map){
        //add a marker
        let markers: Marker = this.map.addMarkerSync({
          title: 'Crime-Alert',
          snippet: 'Passop is awesome!',
          position: location,
          animation: GoogleMapsAnimation.BOUNCE,
          icon: '\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (1).png',
         // icon: '\assets\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png',
          map:map
        });

        //show the infoWindow
        markers.showInfoWindow();

     }

     ///////
     WarnMarker(map){
       let warmMark : Marker = this.map.addMarkerSync({
          title : 'User-Warning',
          snippet: 'Car-Hijackings!',
          position: {lat: 59.325, lng: 18.070},
         // icon: '\icon\pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png',
          map:map
       })

       warmMark.showInfoWindow();
     }

  //////////////////////////////////////////////////////////////////////////////////////////

  initAutocomplete() {
    var map = new map.maps.Map(document.getElementById('map_canvas'), {
      center: {lat: 26.0093, lng: 28.2181},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    let input = document.getElementById('pac-input');
    let searchBox = new map.maps.places.SearchBox(input);
    map.controls[map.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', ()=> {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', ()=> {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker)=> {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new map.maps.LatLngBounds();
      places.forEach((place)=> {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        let icon = {
          url: place.icon,
          size: new map.maps.Size(71, 71),
          origin: new map.maps.Point(0, 0),
          anchor: new map.maps.Point(17, 34),
          scaledSize: new map.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new map.maps.Marker({
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
  }

}