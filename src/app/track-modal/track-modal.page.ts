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
import { Contacts, ContactFieldType,IContactFindOptions } from '@ionic-native/contacts/ngx';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase'
var database = firebase.database();
declare var google
@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.page.html',
  styleUrls: ['./track-modal.page.scss'],
})
export class TrackModalPage implements OnInit {
  lock=false
  ourtype: ContactFieldType[]=["displayName"];
  contactsFound=[]
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
  loca
  theContact
  theContactNumber
  lastLocation
  loc
  constructor(public loadingController: LoadingController,public contacts: Contacts, public userService: UsersService,private androidPermissions: AndroidPermissions,private sms: SMS,private socialSharing: SocialSharing,public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation) {
   //this.search('');
    this.geocoder = new google.maps.Geocoder;
    this.retrieveUserID()
   }

   search()
   {
      // const option: IContactFindOptions ={
      //   filter: q
      // }
      this.contacts.pickContact().then(selectedContact =>{
        console.log(selectedContact);
        this.theContact=selectedContact;
        console.log(this.theContact);
        this.theContactNumber= String(selectedContact['phoneNumbers']['0']['value'])
        this.cellNo=String(selectedContact['phoneNumbers']['0']['value'])
        console.log(selectedContact["phoneNumbers"][0].value, "second meth");
        console.log(this.theContactNumber,"first meth");
      })

    // this.contacts.find(this.ourtype,option).then(conts => {

    //   this.contactsFound= conts;
    // })

   }
  //  onKeyUp(ev)
  //  {

  //        this.search(ev.target.value)
  //  }
  ngOnInit() {
//curr position
this.geolocation.getCurrentPosition().then( position =>{

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
this.loc =String(addressArray['street']+" "+addressArray['section']+" "+addressArray['surburb'])
}
//location name
})

//push to array
this.trackedRoute.push({lat: position.coords.latitude, lng:position.coords.longitude})
console.log(this.trackedRoute, "routes")
console.log(this.trackedRoute.length, "routes")

var siz=this.trackedRoute.length
this.lastLocation= String(position.coords.latitude+","+position.coords.longitude);
//curr position
})
////////////////
 //  //username
           //username
           this.userService.checkingAuthState().then(data => {
        
            console.log(data);
            let user = data
           
            console.log(user['uid']," user ID 1");
           
            var userRoot = firebase.database().ref("Users").child(user['uid'])
            userRoot.once("value", snap => {
              //console.log(userRoot);
              let values = snap.val()
                
              this.username= String(values["name"])
              console.log(this.username," the username");
               //rootsnap
        })
            //user end
        })

    this.plt.ready().then(() =>{
      this.geolocation.getCurrentPosition().then( position =>{
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
    this.presentLoading();
//   let user=this.userService.readCurrentSession()
//  console.log(user['uid'],"the current user profile")
  // let displayName= userProfile[0].displayName
    // console.log(displayName,"the current user NAME")
   //location name
  
  

    this.plt.ready().then(() =>{
      
       
      this.sub = timer(0,300000).subscribe(result =>{
        console.log("timer");
        
   
         


       
      ///////////////////// 
             
        console.log(this.lastLocation,this.loc,this.username, " 155 strings")
         //username
        console.log(this.lastLocation, "last one")
        console.log(this.loc, "address")
         this.msg=this.username+" was last seen at "+this.loc+", copy these Coordinates "+this.lastLocation +" and search them on any map for directions. From the Kasi Detectives Team";
        console.log(this.msg, "msg")
        console.log(cellNo,"phone numbers")
              
        //permission
       this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      );
    
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.SEND_SMS,
      this.androidPermissions.PERMISSION.GET_ACCOUNTS
    ]);

       //send sms in the app
  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
          intent: '' // send SMS without opening any other app
      }
  };
     console.log(this.msg," one i need to see");
    this.sms.send(cellNo,this.msg, options).then(data => {
    console.log('Msg Data Ok,sent');
    this.lock=true
    console.log(this.msg);
    // this.smsText = "Sms sent to the; user!"
    // this.submitFirebaseKin();
  ​
    console.log(data);
    console.log(this.msg);
  }).catch(error => {
    console.log(error);
  });
  }).catch(error =>{
    }) 

        
      
    //timer
     }) 
      
     
  //platform   
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
    this.lock=false
   // this.positionSubscription.unsubscribe()
  }
​async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'loading...',
    duration: 4000
  });
  await loading.present();
  this.cellNo;
  loading.dismiss()
}
  
}
