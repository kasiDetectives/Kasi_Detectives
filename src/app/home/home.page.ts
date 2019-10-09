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
var markers = [];

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
  email = ''
 
  
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
 
 constructor(public zone: NgZone,public alertController: AlertController,public navigationService : NavigationService,private localNotifications: LocalNotifications, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
  private platform: Platform, public modal : ModalController, public firebaseService : FirebaseService,public  socialSharing: SocialSharing) 
  {
  this.checkUserState()
  this.checkEmail()
  this.run()
  this.fetchCrimeCategories()
  this.checkModalOption()
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
   
  // this.notifyDanger();
   //////////////////// constructor notification end
}
 ///////// notification start
notifyDanger(desc)
{
// Schedule a single notification
this.localNotifications.schedule({
  id: 1,
  title:'High Crime Zone ! ',
  text: desc,
  data:{mydata: desc},
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
   

ngOnInit() {
  // Since ngOnInit() is executed before deviceready event,
   // you have to wait the event.
   this.platform.ready();
   this.loadMap();
   this.initMap();
   this.checkUserState()
}

    loadMap(){
      
    }

//////-----------------------
initMap() {
  var infoWindowMarker;
  var selectedMarker
  var  infoWindow
  ///danger image
  var dangerImage = {
    url: 'assets/icon/danger (2).png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
   // anchor: new google.maps.Point(0, 40)
  };

  ///selected area image
  var selectImage = {
    url: 'assets/icon/precision (2).png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(40, 40),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
   // anchor: new google.maps.Point(0, 40)
  };

  ///my location image
  var myLocationimage = {
    url: 'assets/icon/placeholder.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
   // anchor: new google.maps.Point(0, 40)
  };




  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17,
    animation: GoogleMapsAnimation.BOUNCE,
    icon: myLocationimage
   
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
    map: map,
    icon: selectImage
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
  console.log(event.latLng.lat());
  
  let lat = event.latLng.lat()
  let lng = event.latLng.lng()
  
  

  console.log(lat, lng, this.result)
  if(this.email){
    console.log(this.email);
    this.events.publish('openModal', false, null, null)
    this.openModal(lat, lng)
    
  }else{
    this.events.publish('openModal', true, lat, lng)
    this.router.navigate(['/login'])
    
  }
  /////////////////////////////////////
  

  
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
        animation: GoogleMapsAnimation.BOUNCE,
        icon: myLocationimage

      });
      this.markers.push(marker);
      map.setCenter(pos[0].location);
          ///
      infoWindow.setPosition(pos[0].location);
      infoWindow.setContent('Your Location.');
      infoWindow.open(map);
      map.setCenter(pos[0].location);
​
///  popular map with crime hotspots start
this.loadLocations().then(info =>{
  console.log( info.length);
for( let x = 0; x < info.length; x++ ){
   console.log(info[x]);    
var  markers = new google.maps.Marker({
map: map,
draggable: true,
position: new google.maps.LatLng(info[x].lat, info[x].lng),
icon: dangerImage,
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


///popular map with crime hotspots end
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
          this.notifyDanger(description);
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

  checkEmail(){
    this.events.subscribe('user:created', (data)=>{
      this.email = data
      console.log(this.email);
    })
  }
  checkUserState(){
    console.log('checking state');
    console.log(this.user);
    
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


   fetchCrimeCategories(){
    this.firebaseService.fetchCrimeCategories().then(data=>{
      this.result = data
      console.log(this.result);     
    })
  }


   async openModal(lat, lng){
     console.log(lat, lng);
     
    const myModal = await this.modal.create({
    component: PopupPage,
    componentProps:{
      result : this.result,
      lat : lat,
      lng: lng
  
    }
        
    });
  
  
  myModal.onDidDismiss().then((dataReturned) => {
    console.log(dataReturned);
    let data = dataReturned.data
    console.log(data);
    
    if(data !== null && data !== undefined){
      let submitInfo = data[0]
      console.log(submitInfo);
      
      this.submit(submitInfo)
    }
  });
  
    
     myModal.present()
       }

      
       checkModalOption(){
         this.events.subscribe('openModal', (boolean, lat, lng)=>{
          if(boolean === true){
            this.openModal(lat, lng)
          }else{
            
          }
         })
       }

      submitToFirebase(submitInfo){
        console.log('And we all just');
        
        this.firebaseService.submit(submitInfo)
      }
      
      submit(submitInfo){
        console.log('And we are all just entertainers, and we stupid and contagious');
        
        this.submitToFirebase(submitInfo)
        //this.tweet()
      }
 

}
