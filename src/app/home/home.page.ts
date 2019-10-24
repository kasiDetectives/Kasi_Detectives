import { AlertController } from '@ionic/angular';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit, NgZone, ViewChild, asNativeElements} from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Events, ToastController, Platform, ModalController } from '@ionic/angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 Marker,
 GoogleMapsAnimation,
 MyLocation,
 Polyline,
 LatLng,
 GoogleMapOptions,
 LatLngBounds
} from '@ionic-native/google-maps';
import { Icon } from 'ionicons/dist/types/icon/icon';
import { PopupPage } from '../popup/popup.page';
import { ReportedIncidentPage } from '../reported-incident/reported-incident.page'
import { FirebaseService } from '../firebase.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
//import { Keyboard } from '@ionic-native/keyboard/ngx';

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
///
// import { TextInput } from 'ionic-angular';

import { IonInput } from '@ionic/angular';

declare var google
var map;
var markers = [];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  @ViewChild('searchInput', {static: false})  inputElement: IonInput;
  selectedMode
  lat
  lng

  start
  end : string
  destinations: string


  myDest

  Lats = [] 
  Long = []


  keyboardShow = false
  MarkersArray = []
  //////////////////////////////////////////////
  address:string;
  DBLocation=[]
  scheduled=[];
  mySelected
  pic = '\assets\icon\magnifying-glass (10).png'
  //user : Array<any> = []
  user = {}
  userId
  result = []
  loc =[]
  email = null
  lats
  long
  highRiskLocations = {}
  reportedLocations = {}
  message
  selectImage
  mapz : any;
  markers : any;
  autocomplete: any;
  autocompletez: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  autocompleteItemz: any;

  dangerImage
  
  backButton

  directionsService
  array = []
 
  constructor(public zone: NgZone,public alertController: AlertController, private localNotifications: LocalNotifications, public userService : UsersService, public router : Router, public events : Events,  public toastCtrl: ToastController,
    private platform: Platform, public modal : ModalController, public firebaseService : FirebaseService,public  socialSharing: SocialSharing, private keyboard: Keyboard) 
    {
    this.exit()
    this.checkUserState()
    this.checkEmail()
    this.run()
    this.fetchCrimeCategories()
    this.setUser()
    this.getDate()
    //this.loadUserIncidents()
    console.log("why");
    
    ////
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompletez = { inputz: '' };
    this.autocompleteItems = [];
    this.autocompleteItemz = [];
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
    //////////////////// constructor notification end
  }
  getDate(){
    let currentDate = new Date()
    console.log(currentDate);
    let date = currentDate.getDate()
    console.log(date);
    let month 
    let monthArray = [
      {key: 0, value: 'January'},
      {key: 1, value: 'February'},
      {key: 2, value: 'March'},
      {key: 3, value: 'April'},
      {key: 4, value: 'May'},
      {key: 5, value: 'June'},
      {key: 6, value: 'July'},
      {key: 7, value: 'August'},
      {key: 8, value: 'September'},
      {key: 9, value: 'October'},
      {key: 10, value: 'November'},
      {key: 11, value: 'December'}
    ]
    
    let monthNum = currentDate.getMonth()
    for(let i = 0; i < monthArray.length; i++){
      if(monthNum === monthArray[i].key){
        month = monthArray[i].value
      }
    }
    console.log(month);
    let year = currentDate.getFullYear()
    console.log(year);
  }
  ///////// notification start
  notifyDanger(desc){
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      title:'High Crime Area! ',
      text: 'A ' + desc + 'has been reported here.',
      sound: this.setSound(),
      trigger: {in: 2, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true
    });
    console.log("hh")
  } 
  //set sound
  setSound(){
    if(this.platform.is('android')){
      return 'file://assets/sounds/shame.mp3';
    } else {
      return 'file://assets/sounds/bell.mp3';
    }
  }
  //
  showAlert(header,sub,msg){
    this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons:['Ok']
    }).then(alert => alert.present());
  }
  //
  getAll(){
    this.localNotifications.getAll().then(res =>{
      this.scheduled =res;
      console.log(res)
    });
    console.log("hh")
  }
    ///////////////////////////notification end
    //deleting marker methods start    // delete markers on array and on map
  deleteMarkers(){
    this.clearMarkers();
    markers = [];
  }
  //  //set map on all markers
  setMapOnAll(map){
    for(var i = 0; i < markers.length; i++){
      markers[i].setMap(map);
    }
  }
  // //delete markers only on map
  clearMarkers(){
    this.setMapOnAll(null);
  }
  ngOnInit(){
    // Since ngOnInit() is executed before deviceready event, // you have to wait the event.
    this.platform.ready();
    this.initMap();
    this.checkUserState()
    //this.Directions();
  }
  handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  //////////////// Calculating distance
  calcDistance () {
    var input=[]
    return new Promise((resolve, reject) => {
      console.log(resolve,"resolve");
      this.LandMarks().then(data => {
        input.push(data)
        console.log(input,"input");
        for(let x = 0; x < input[0].length; x++){
          if(input[0][x].location <= 0.5 ) {
            var description = input[0][x].desc
            // notification
            console.log("notification", description);
            this.notifyDanger(description);
          } else {
            console.log("you safe.");
          }
        }
      })
    })
  }
  ​LandMarks(){
    let result : Array<any> = []
    console.log(  this.loc ,"inside array");
    var temp = 0;
    var  output = []
    var dist = google.maps.geometry.spherical.computeDistanceBetween;
    console.log(dist,"dist");
    return new Promise((resolve, reject) => {
      this.loadLocations().then(data => { 
        console.log( data.length);
        for( let x = 0; x < data.length; x++ ){
          console.log(x);
          this.DBLocation.push({
            crimeType: data[x].crimeType,
            location:new google.maps.LatLng(data[x].lat,data[x].lng)
          })
          var  infoWindow = new google.maps.InfoWindow;
          //var infoWindowMarker = new google.maps.InfoWindow;
          var  markers = new google.maps.Marker({
            map: map,
            draggable: false,
            position: new google.maps.LatLng(data[x].lat, data[x].lng),
            icon: this.dangerImage,
          });
          console.log(new google.maps.LatLng(data[x].lat, data[x].lng));
          console.log(  markers , "vvvv");
          google.maps.event.addListener(markers, 'click', ((markers, x) => {
            return() => {
              infoWindow.setContent(data[x].crimeType);
              infoWindow.setPosition(new google.maps.LatLng(data[x].lat, data[x].lng));
              infoWindow.open(map, markers);
              console.log(new google.maps.LatLng);
              var infoWindowMarker;
              infoWindowMarker= new google.maps.InfoWindow;
              let addressArray = {}
              this.geocoder.geocode({'location': new google.maps.LatLng(data[x].lat, data[x].lng)}, (results, status) => {
                console.log(results);
                if(status === "OK"){
                  addressArray = {
                    street: results[0].address_components[1].long_name,
                    section: results[0].address_components[2].long_name,
                    surburb: results[0].address_components[3].long_name
                  }
                  console.log(addressArray);
                  console.log(addressArray['street'])
                  console.log(results);
                  infoWindowMarker.setContent(addressArray['street'])
                  console.log(addressArray);
                }
                this.openReportModal(addressArray, data[x].crimeType, data[x].lat, data[x].lng)
              })
            }
          })(markers, x));
        }
        ///
        //
        ///
        
        this.loadUserIncidents().then(data => {
          console.log(data.length);
          // duplicated code
              ///selected area image
    
          for( let x = 0; x < data.length; x++ ){
            var  markers = new google.maps.Marker({
              map: map,
              draggable: false,
              position: new google.maps.LatLng(data[x].lat, data[x].lng),
              icon:  this.selectImage,
            });
            google.maps.event.addListener(markers, 'click', ((markers, x) => {
              return() => {
                infoWindow.setContent(data[x].crimeType);
                infoWindow.setPosition(new google.maps.LatLng(data[x].lat, data[x].lng));
                infoWindow.open(map, markers);
                console.log(new google.maps.LatLng);
                var infoWindowMarker;
                infoWindowMarker= new google.maps.InfoWindow;
                let addressArray = {}
                this.geocoder.geocode({'location': new google.maps.LatLng(data[x].lat, data[x].lng)}, (results, status) => {
                  console.log(results);
                  if(status === "OK"){
                    addressArray = {
                      street: results[0].address_components[1].long_name,
                      section: results[0].address_components[2].long_name,
                      surburb: results[0].address_components[3].long_name
                    }
                    console.log(addressArray);
                    console.log(addressArray['street'])
                    console.log(results);
                    infoWindowMarker.setContent(addressArray['street'])
                    console.log(addressArray);
                  }
                  this.openReportModal(addressArray, data[x].crimeType, data[x].lat, data[x].lng)
                })
              }
            })(markers, x));
          }
        })
        
        
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
      console.log(this.array, "XXXXX");
    })
  }
  ////////////////////////  getting different places
  updateSearchResults(){
    console.log(this.autocomplete.input);
    if(this.autocomplete.input === '') {
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
  checkUserState(){
    console.log('checking state');
    console.log(this.user);
    this.events.subscribe('user:loggedOut', (boolean)=>{
      console.log(boolean);
      if(boolean === true){
        this.userService.signOut()
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
  async setUser(){
    this.userService.checkingAuthState().then(data => {
      //this.userId = data
      console.log('this is a user');
      this.user = data
      this.userId = this.user['uid']
      this.email = this.user['email']
      this.events.publish('user:loggedIn', this.email)
      console.log(this.user);
      console.log(this.userId);
      console.log(this.email);
    })
  }
  async loadLocations(){
    let result :any
    await this.firebaseService.fetchSavedLocations().then(data =>{
      result = data
      this.highRiskLocations = data
      console.log(this.highRiskLocations);
      console.log(result.length);
    })
    console.log(result);
    //this.LandMarks()
    return  result 
  }
  async loadUserIncidents(){
    let result :any
    await this.firebaseService.fetchUserIncidents().then(data => {
      result = data
      this.reportedLocations = data
      console.log(result.length);
    })
    console.log(result);
    return  result
  }
  fetchCrimeCategories(){
    this.firebaseService.fetchCrimeCategories().then(data => {
      this.result = data
      console.log(this.result);
    })
  }
  async alertUserToLogin() {
    const alert = await this.alertController.create({
      header: '',
      message: 'You need to be logged in to use this function',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'success',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (user) => {
            console.log('Confirm Okay');
            this.router.navigate(['/login'])
          }
        }
      ]
    });
    await alert.present();
  }
    async openReportModal(address, crimeType, lat, lng){
      console.log(crimeType, lat, lng);
      

            const myModal = await this.modal.create({
        
        
              component: ReportedIncidentPage,
              cssClass: 'my-custom-modal-css',
              componentProps: {
                address: address,
                lat: lat,
                lng: lng
              }
      
            });
            myModal.onDidDismiss().then((data) =>{
              let dataReturned = data
              console.log(dataReturned);
              if(dataReturned.data !== undefined){
                if(dataReturned.data[0].report === true){
                  let data = dataReturned
                  console.log(data)
                  if(this.email === null){
                    this.alertUserToLogin()
                  }else{
                    this.openModal(address, lat, lng)  
                }
                }
              }
            });
            myModal.present()
            console.log(address);     
    }
   
    
  
      async submitToFirebase(submitInfo){
        console.log('And we all just');
        let date = Date()
        console.log(date);
        
        await this.firebaseService.submit(submitInfo).then(data => {
          console.log(data);
          this.succesfulSubmission()
          
        })
      }
      
        async succesfulSubmission() {
          const toast = await this.toastCtrl.create({
            message: 'Your report has been submitted to our database.',
            duration: 2000
          });
          toast.present();
        }
      
      
    
  async openModal(address, lat, lng){
    console.log(lat, lng);
    console.log(address);
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
 
  submit(submitInfo){
    console.log(submitInfo);
    console.log('And we are all just entertainers, and we stupid and contagious');
    this.submitToFirebase(submitInfo)
    this.tweet(submitInfo.description)
  }
  ///Exiting the app
  exit(){
    this.backButton = this.platform.backButton.subscribeWithPriority((1), () => {
      if(this.constructor.name === 'HomePage'){
        if(window.confirm('Do you want to exit the app?')){
          navigator['app'].exitApp()
        }
      }
    })
  }
  tweet(message){
    this.socialSharing.shareViaTwitter('A ' + message + ' has been shared with users of Kasi_Detectives.', this.pic,'').then(() => {

    }).catch(() => {

    })
  }
  selectSearchResult(item){
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      console.log(this.markers);
      if(status === 'OK' && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          zoom: 15,
          draggable: true
        });
        this.markers.push(marker);
        map.setCenter(results[0].geometry.location);
      }
      console.log(this.markers);
      marker.addListener('click', (event) => {
        this.reportIncident(event, marker)
      })
    })
  }
  initMap() {
    var infoWindowMarker;
    var selectedMarker
    var  infoWindow
    ///danger image
    this.dangerImage = {
      url: 'assets/icon/danger (2).png', // This marker is 20 pixels wide by 32 pixels high.
      //  url: 'assets/icon/pin-black-silhouette-in-diagonal-position-pointing-down-right (8).png',
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };
    this.selectImage = {
      url: 'assets/icon/pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };
    ///my location image
    var myLocationimage = {
      url: 'assets/icon/placeholder.png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };
    console.log('initialising map');

    var center = new google.maps.LatLng(0, 0);
    var myOptions = {
      zoom: 18,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      center: center
    }
    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    this.directionsService = new google.maps.DirectionsService();     // directions services

    infoWindow = new google.maps.InfoWindow;
    infoWindowMarker= new google.maps.InfoWindow;
    // /// map click listener start
    map.addListener('dblclick',(event) => {
      //     //delete marker
      this.deleteMarkers()
      //  //delete marker end
      //this.addMarker(event.latLng);
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        // icon: selectImage,
        draggable: true
      });
      markers.push(marker);
      selectedMarker = marker
      console.log(selectedMarker,"first selected marker")
      console.log(event.latLng,"location of new marker")
      ////// listener on marker start
      // Report incident
      marker.addListener('click', (event) => {
        this.reportIncident(event, marker)
      });
      //// listener on marker end
    });
    // Get the location of you
    if(navigator.geolocation) {
      //this.array =[]
      navigator.geolocation.getCurrentPosition((position) => {
        var pos=[]
        pos.push({
          location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        });
        let marker = new google.maps.Marker({
          position: pos[0].location,
          zoom: 17,
          map: map,
          animation: GoogleMapsAnimation.BOUNCE,
          icon: myLocationimage, //icon: selectImage
        });
        this.markers.push(marker);
        map.setCenter(pos[0].location);
        infoWindow.setPosition(pos[0].location);
        infoWindow.setContent('Your Location.');
        infoWindow.open(map);
        map.setCenter(pos[0].location);
        this.array.push(pos[0])
        console.log(this.array, "zzz");
        this.Lats = this.array[0].location.lat();
        console.log( this.Lats, "weewewe");
        this.Long = this.array[0].location.lng();
        // calling function to plot
        this.plotDirections(this.start, this.end);
      }, () => {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  reportIncident(event, marker){
    var infoWindowMarker;
    infoWindowMarker = new google.maps.InfoWindow;
    infoWindowMarker.open(map,marker);
    //infoWindowMarker.setContent(String(event));
    let lat = event.latLng.lat()
    let lng = event.latLng.lng()
    let addressArray = {}
    this.geocoder.geocode({'location': event.latLng}, (results, status) => {
      console.log(results);
      if(status === "OK") {
      //let address= results[0].address_components[1].long_name + ',' + results[0].address_components[2].long_name + ',' + results[0].address_components[3].long_name
        addressArray = {
          street: results[0].address_components[1].long_name,
          section: results[0].address_components[2].long_name,
          surburb: results[0].address_components[3].long_name
        }
        // addressArray.push()
        console.log(addressArray);
        console.log(addressArray['street'])
        console.log(results);
        //console.log(infoWindowMarker.setContent(addressArray['street']))
        infoWindowMarker.setContent(addressArray['street'])
        if(this.email === null) {
          //this.events.publish('openModal', true, lat, lng)
          //this.router.navigate(['/login'])
        this.alertUserToLogin()
        } else {
          console.log(this.email);
          //this.events.publish('openModal', false, null, null)
          this.openModal(addressArray, lat, lng)
        }
      }
    })
    console.log(infoWindowMarker.setContent(addressArray['street']))
    console.log(marker,"marker selected")
    console.log(event.latLng.lat());
    console.log(lat, lng, this.result)
  }

      // code is working from here
  plotDirections(start, end) {
    
      // start for getting user location
    var locations = {lat: this.Lats, lng: this.Long}
    console.log(locations, 'runninnnng');
    this.start = locations

      //end for getting user destinations
      this.end = this.destinations 
      console.log(this.end, "kokoko");
    var method = 'DRIVING';
    var request = {
      origin: this.start,
      destination: this.end,
      travelMode: google.maps.DirectionsTravelMode[method],
      provideRouteAlternatives: true
    };
    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        var routes = response.routes;
        var colors = ['red', 'green', 'blue', 'orange', 'yellow', 'black'];
        var directionsDisplays = [];
        // Reset the start and end variables to the actual coordinates
        start = response.routes[0].legs[0].start_location;
        end = response.routes[0].legs[0].end_location;
        // Loop through each route
        for (var i = 0; i < routes.length; i++) {
          var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map,
            directions: response,
            routeIndex: i,
            avoidareas: this.markers,
            draggable: true,
            polylineOptions: {
              strokeColor: colors[i],
              strokeWeight: 4,
              strokeOpacity: .3
            }
          });
          // Push the current renderer to an array
          directionsDisplays.push(directionsDisplay);
          // Listen for the directions_changed event for each route
          google.maps.event.addListener(directionsDisplay, 'directions_changed', ((directionsDisplay, i) => {
            return () => {
              var directions = directionsDisplay.getDirections();
              var new_start = directions.routes[0].legs[0].start_location;
              var new_end = directions.routes[0].legs[0].end_location;
              if ((new_start.toString() !== start.toString()) || (new_end.toString() !== end.toString())) {
                // Remove every route from map
                for (var j = 0; j < directionsDisplays.length; j++) {
                  directionsDisplays[j].setMap(null);
                }
                // Redraw routes with new start/end coordinates
                this.plotDirections(new_start, new_end);
              }
            }
          })(directionsDisplay, i)); // End listener
        } // End route loop
      }
    });
 }

  setDestination(event){
    console.log(event.detail.value);
    this.destinations = event.detail.value
    console.log(this.destinations);
  }
/////////////////////////////////////////////////////////////////////////////////////
  /////////////  places
  // SearchPlaces(){
  //   console.log(this.autocompletez.inputz);
  //   if(this.autocompletez.inputz === '') {
  //     this.autocompleteItemz = [];
  //     return;
  //   }
  //   this.GoogleAutocomplete.getPlacePredictions({ inputz: this.autocompletez.inputz },
  //   (predictions, status) => {
  //     this.autocompleteItemz = [];
  //     this.zone.run(() => {
  //       predictions.forEach((prediction) => {
  //         this.autocompleteItemz.push(prediction);
  //       });
  //     });
  //   });
  // }
  // SearchedResult(itemz){
  //   this.autocompleteItemz = [];
  //   this.geocoder.geocode({'Here': itemz.place_id}, (results, status) => {
  //     console.log(this.markers);
  //     if(status === 'OK' && results[0]) {
  //       let position = {
  //         lat: results[0].geometry.location.lat,
  //         lng: results[0].geometry.location.lng
  //       };
  //       var marker = new google.maps.Marker({
  //         position: results[0].geometry.location,
  //         map: map,
  //         zoom: 15,
  //         draggable: true
  //       });
  //       this.markers.push(marker);
  //       map.setCenter(results[0].geometry.location);
  //     }
  //     console.log(this.markers);
  //     marker.addListener('click', (event) => {
  //       this.reportIncident(event, marker)
  //     })
  //   })
  // }
  ////////////////////////////////////////////////////////////////////////////////
  openKeyboard(){
    this.keyboard.show();
    //this.keyboard.setResizeMode(mode)
    this.keyboard.onKeyboardDidShow()
    this.keyboard.setResizeMode
    window.addEventListener('keyboardWillShow', () => console.log('keyboard showing'))
  }
  closeKeyboard(){
    // document.getElementById("place-id").blur()
    // console.log('closing keyboard');
    
    // this.keyboard.hide()
    // console.log('closing keys');
    
  }
  scrollStart() {
    console.log(this.inputElement);
    this.inputElement.setFocus()
    this.inputElement.getInputElement().then(data => {
      let value = data
      console.log(value);
    })
    
    
    console.log(this.inputElement.setFocus());
    
    //padding.getElementRef().nativeElement.blur();
    this.inputElement.ionBlur
    console.log(this.inputElement.ionBlur);
    
    document.getElementById("place-id").blur()
    this.keyboard.onKeyboardHide()
    this.autocompleteItems = [];
  }
}
