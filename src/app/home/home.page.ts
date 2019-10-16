import { AlertController } from '@ionic/angular';
import { UsersService } from '../users.service';
import { Router, ChildActivationStart } from '@angular/router';
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
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

declare var google
var map;
var markers = [];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  

  
  // currentPosition
  // directionsDisplay
  // directionsService

   //targetDestination = ("#target-dest").valueOf();
   targetDestination
  /////////////////////////////////////////////////////////////////////////////////////////////
  address:string;
  DBLocation=[]
  scheduled=[];

  selectedMode

  pic = '\assets\icon\magnifying-glass (10).png'
  user = []
  userId
  result = []
  loc =[]
  email = null
 
  
 message
///
  mapz : any;
  markers : any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  
 
  ZeroLocation = []
 // directionsService
  array = []
 
 constructor(public zone: NgZone,public alertController: AlertController,public navigationService : NavigationService,private localNotifications: LocalNotifications, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
  private platform: Platform, public modal : ModalController, public firebaseService : FirebaseService,public  socialSharing: SocialSharing) 
  {
  this.checkUserState()
  this.checkEmail()
  this.run()
  this.fetchCrimeCategories()
  //this.checkModalOption()
  console.log("why");
  this.userService.signIn().then(data => {
    this.userId = data
     })
  ////
   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
   this.autocomplete = { input: '' };
   this.autocompleteItems = [];
   this.geocoder = new google.maps.Geocoder;
   this.markers = [];
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
  //  this.checkModalOption()

   //
   ///
   ///
   }

  loadMap(){

 }

initMap() {
 var directionsRenderer = new google.maps.DirectionsRenderer;
 var directionsService = new google.maps.DirectionsService;
 /////
var LocationStart = 0;

  ///
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
    zoom: 17
    // animation: GoogleMapsAnimation.BOUNCE,
    // icon: myLocationimage
  });

////// for directions start
directionsRenderer.setMap(map);

   this.calculateAndDisplayRoute(directionsService, directionsRenderer);
   document.getElementById('mode').addEventListener('change', () => {
   this.calculateAndDisplayRoute(directionsService, directionsRenderer);
});

// outputAtoB = document.getElementById('a2b'),
// flightPath = new google.maps.Polyline({
//   path: [pointA, pointB],
//   geodesic: true,
//   strokeColor: '#FF0000',
//   strokeOpacity: 1.0,
//   strokeWeight: 2
// });

/////// directions end


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
// Report incident
 marker.addListener('click', (event) => {
  infoWindowMarker.open(map,marker);
  infoWindowMarker.setContent(String(event.place));

  let lat = event.latLng.lat()
  let lng = event.latLng.lng()
  this.geocoder.geocode({'location': event.latLng}, (results, status) =>{

    if(status === "OK"){
      //let address= results[0].address_components[1].long_name + ',' + results[0].address_components[2].long_name + ',' + results[0].address_components[3].long_name
      let addressArray = {
        street: results[0].address_components[1].long_name,
        section: results[0].address_components[2].long_name,
        surburb: results[0].address_components[3].long_name
      }
      // addressArray.push()
      console.log(addressArray);
      console.log(results);
      
      

      if(this.email === null){
        //this.events.publish('openModal', true, lat, lng)
        //this.router.navigate(['/login'])
        
      }else{
        console.log(this.email);
        //this.events.publish('openModal', false, null, null)
        this.openModal(addressArray, lat, lng)  }
    }
  } )

  console.log(infoWindowMarker.setContent(String(event.place)))
  console.log(marker,"marker selected")
  console.log(event.latLng.lat());
  

  
  

  console.log(lat, lng, this.result)
  
  /////////////////////////////////////
  

  
 });

//// listener on marker end
});


   // Get the location of user
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

////

  
///  popular map with crime hotspots start
this.loadLocations().then(info =>{
  console.log( info.length);
for( let x = 0; x < info.length; x++ ){
  // console.log(info[x]);    
var  markers = new google.maps.Marker({
map: map,
draggable: true,
position: new google.maps.LatLng(info[x].lat, info[x].lng),
icon: dangerImage,
});
//console.log(new google.maps.LatLng(info[x].lat, info[x].lng));

   
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

      pos[0] = LocationStart;
      this.ZeroLocation.push(pos[0] )
      console.log(LocationStart, "Zero");
      
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
    //  console.log(x);
      
      this.DBLocation.push({
        crimeType: data[x].crimeType,
      location:new google.maps.LatLng(data[x].lat,data[x].lng)
      })
    
    }
​
    console.log(this.DBLocation);
      
    for(let y = 0; y < this.DBLocation.length; y++){
      console.log(this.DBLocation[y]);
     // console.log(this.array, 'array')
      console.log(this.array[0].location)
    //  console.log(this.array[0].location, 'running');
      
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


  checkUserState(){
    console.log('checking state');
    console.log(this.user);
    
    this.events.subscribe('user:loggedOut', (boolean)=>{
      console.log(boolean);
      if(boolean === true){
        this.userService.destroyUserData()
        this.events.publish('user:loggedIn', false);
      }
    })
  }
  checkEmail(){
    this.events.subscribe('user:loggedIn', (data)=>{
      if(data === false){
        this.email = null
        console.log(this.email);
      }else{
        this.email = data
        console.log(this.email);
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
   
   /////////////////////////////////////////////////////////////////////////////
  // code is working from here
   calculateAndDisplayRoute(directionsService, directionsRenderer) {
    
    var userPosistion = this.array
     console.log(userPosistion, "wereAre");

     var users = this.ZeroLocation
     console.log(users, "user");

     var Fix = new google.maps.LatLng(users [0],users [1]) 
     Fix = this.array
     console.log(Fix, "Fix");
     

     //var WeAre = {lat: -26.019918, lng: 28.217855}

    this.selectedMode = document.getElementById('mode')["value"];
    console.log(this.selectedMode);
    //if (WeAre  && this.targetDestination && this.targetDestination != '') {
    directionsService.route({ 
      //origin: userPosistion[0].location,// {lat: -26.019918, lng: 28.217855}, //Fix,//  // this.array[0].location,  // userPosistion[0].location,
      origin : {lat: -26.019918, lng: 28.217855},//{lat: userPosistion[0].location.lat, lng : userPosistion[0].location.lng},
      destination: {lat: -26.669239, lng: 27.882660},  //this.targetDestination,// joburg park station.  -26.669239, 27.882660
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[this.selectedMode]
      
    }, (response, status)=> {
      if (status == 'OK') {
       // this.directionsDisplay.setPanel(document.getElementById("directions"));
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }

    });
    console.log( origin, "ttt");
  }
//}
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////


  ///////////////////////// attemptin this
//   initialize(lat, lon)
//   {
//       this.directionsDisplay = new google.maps.DirectionsRenderer(); 
//       this.directionsService = new google.maps.DirectionsService();

//       this.currentPosition = new google.maps.LatLng(lat, lon);

//       map = new google.maps.Map(document.getElementById('map_canvas'), {
//          zoom: 15,
//          center: this.currentPosition,
//          mapTypeId: google.maps.MapTypeId.ROADMAP
//        });

//       this.directionsDisplay.setMap(map);

//        var currentPositionMarker = new google.maps.Marker({
//           position: this.currentPosition,
//           map: map,
//           title: "Current position"
//       });

//       var infowindow = new google.maps.InfoWindow();
//       google.maps.event.addListener(currentPositionMarker, 'click', ()=> {
//           infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon);
//           infowindow.open(map, currentPositionMarker);
//       });
//    //////////
   
//       // 1
//         navigator.geolocation.getCurrentPosition(this.locSuccess, this.locError);

//       // 2
//        // this.calculateRoute();

//   }

//   locError(error) {
//       // initialize map with a static predefined latitude, longitude
//      this.initialize(59.3426606750, 18.0736160278);
//   }

//   locSuccess(position) {
//       this.initialize(position.coords.latitude, position.coords.longitude);
//   }

//  calculateRoute() {

//     //  var targetDestination = ("#target-dest")["Val"];
//       this.targetDestination  = document.getElementById('target-dest')["value"];
//       if (this.currentPosition && this.currentPosition != '' && this.targetDestination && this.targetDestination != '') {
//           var request = {
//               origin:this.currentPosition, 
//               destination:this.targetDestination,
//               travelMode: google.maps.DirectionsTravelMode["DRIVING"]
//           };

//           this.directionsService.route(request, (response, status)=> {
//               if (status == google.maps.DirectionsStatus.OK) {
//                   this.directionsDisplay.setPanel(document.getElementById("directions"));
//                   this.directionsDisplay.setDirections(response); 

//                   /*
//                       var myRoute = response.routes[0].legs[0];
//                       for (var i = 0; i < myRoute.steps.length; i++) {
//                           alert(myRoute.steps[i].instructions);
//                       }
//                   */
//                 //  ("#results").show();
//               }
//               else {
//                 console.log("hidden");
                
//                  // ("#results").hide();
//               }
//           });
//       }
//       else {
//         console.log("hidden2");
//          // ("#results").hide();
//       }
//   }


getmode(event) {
    this.selectedMode= event.detail.value
  console.log(this.selectedMode);

  this.targetDestination = event.detail.value
  console.log(this.targetDestination, "ooo");
  
}


   fetchCrimeCategories(){
    this.firebaseService.fetchCrimeCategories().then(data=>{
      this.result = data
      console.log(this.result);     
    })
  }


   async openModal(address, lat, lng){
     console.log(lat, lng);
    
    const myModal = await this.modal.create({
    component: PopupPage,
    componentProps:{
      result : this.result,
      address: address,
      lat : lat,
      lng: lng,
      userId: this.userId
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
         console.log('checking modals')
         this.events.subscribe('openModalAgain', (boolean, lat, lng)=>{
           console.log('openModal:', boolean);
           if(this.email != null){
             console.log(this.email);
             
            if(boolean === true){
              console.log('boolean too: ', boolean);
              console.log('opening modal');
              
              //this.openModal(address, lat, lng)
            }else{
                        
            }
           }else{
             console.log('why are you like this')
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
