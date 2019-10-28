import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription, Observable, observable,timer } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { filter } from 'minimatch';
​import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { interval } from 'rxjs'
​​import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { UsersService } from '../users.service';
declare var google
@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.page.html',
  styleUrls: ['./track-modal.page.scss'],
})
export class TrackModalPage implements OnInit {
  
  isTracking = false
  current = null
  trackedRoute = [];
  previousTracks = [];
  sub : Subscription
  email
  cellNo
  msg
  positionSubscription: any;
  geocoder: any
  username
  constructor( public userService: UsersService,private androidPermissions: AndroidPermissions,private sms: SMS,private socialSharing: SocialSharing,public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation) {

    this.geocoder = new google.maps.Geocoder;
    this.retrieveUserID()
   }

   
  ngOnInit() {
    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition().then( position => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(latLng);
      }).catch(error => {
      })
    }) 
  }

  retrieveUserID(){
    this.userService.checkingAuthState().then(data => {
      console.log(data);
      let result  = data
      let userID = result['uid']
      console.log(userID);
      this.userService.retrievingUserInfo(userID).then(requestResult => {
        let userProfile = requestResult
        console.log(userProfile);
        this.username = userProfile['displayName']
        console.log(this.username);
        console.log(this.username);
        
        

      })

      
    })
  }
  //
  start(cellNo)  {
    console.log(cellNo);
    
    this.isTracking = true
    this.trackedRoute = []
​  
    //   let user=this.userService.readCurrentSession()
    //  console.log(user['uid'],"the current user profile")
    // let displayName= userProfile[0].displayName
    // console.log(displayName,"the current user NAME")
    this.plt.ready().then(() => {
      this.sub = timer(0,10000).subscribe(result => {
        console.log("timer");
        //curr position
        this.geolocation.getCurrentPosition().then(position => {
            // location name
          this.geocoder.geocode({'location': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)}, (results, status) => {
            console.log(results);
            if(status === "OK") {
            //let address= results[0].address_components[1].long_name + ',' + results[0].address_components[2].long_name + ',' + results[0].address_components[3].long_name
              let addressArray = {
                street: results[0].address_components[1].long_name,
                section: results[0].address_components[2].long_name,
                surburb: results[0].address_components[3].long_name
              }
              var  loc= addressArray['street']+", "+addressArray['section']+", "+addressArray['surburb']
              console.log(loc)
              //push to array
              this.trackedRoute.push({lat: position.coords.latitude, lng:position.coords.longitude})
              console.log(this.trackedRoute, "routes")
              console.log(this.trackedRoute.length, "routes")

              var siz=this.trackedRoute.length
              var lastLocation= position.coords.latitude+","+position.coords.longitude;
              console.log(lastLocation, "last one")
              console.log(loc, "address")
              this.msg = "The location of "+  this.username +" is "+loc+". Copy These Coordinates "+lastLocation +" and search them on any map for directions. from the Kasi Detective App";
              console.log(this.msg, "msg")
              console.log(cellNo, "phone numbers")
              //send sms in the app


              this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(result => {
                console.log(result);
                
                console.log('Has permission?', result.hasPermission)
              }).catch(error => {
                console.log(error);
                
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
              })
              
              this.androidPermissions.requestPermissions([
                this.androidPermissions.PERMISSION.SEND_SMS,
                this.androidPermissions.PERMISSION.GET_ACCOUNTS
              ]);
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then((result) => {
                console.log(result);
                
                var options = {
                  replaceLineBreaks: false, // true to replace \n by a new line, false by default
                  android: {
                  intent: '' // send SMS without opening any other app
                  }
                };
                this.sms.send(String(cellNo), this.msg, options).then(data => {
                  console.log(data);
                  
                  alert('Message has been succesfully sent')
                  console.log('Msg Data Ok');
                  // this.smsText = "Sms sent to the; user!"
                  // this.submitFirebaseKin();
                  console.log(data);
                }).catch(error => {
                  console.log(error);
                });
              }).catch(error =>{
              })
            }
          })
          //location name
          //curr position
        })
      }) 
    })
    this.cellNo=null
    this.msg=null
    //end function
  }
​///
  stop(){
    let newRoute = {finish:new Date().getTime(), path:this.trackedRoute}
    this.isTracking = false
    console.log(newRoute);
    this.sub.unsubscribe()
   // this.positionSubscription.unsubscribe()
  }
​
  
}
