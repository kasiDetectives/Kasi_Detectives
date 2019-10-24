import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription, Observable, observable,timer } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { filter } from 'minimatch';
​import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { interval } from 'rxjs'
​​
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
  positionSubscription: any;

  constructor(private socialSharing: SocialSharing,public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation) { }

  ngOnInit() {
    this.plt.ready().then(() =>{
      this.geolocation.getCurrentPosition().then( position =>{
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(latLng);
        
      }).catch(error =>{
      })
      })
  }
  //
  start(email)
  {
    this.isTracking = true
    this.trackedRoute = []
​
    this.plt.ready().then(() =>{
      this.sub = timer(0,10000).subscribe(result =>{
        console.log("timer");
        this.geolocation.getCurrentPosition().then( position =>{
        //push to array
        this.trackedRoute.push({ lat: position.coords.latitude, lng:position.coords.longitude})
        }).catch(error =>{
        })
        console.log(this.trackedRoute, "routes")
      console.log(this.trackedRoute.length, "routes")

        //send email
      // Share via email
      var body="This is the location of " +  this.trackedRoute + "from the Kasi Detectives app";
      var subject= 'Location';
      //this.socialSharing.shareViaWhatsApp
    this.socialSharing.shareViaEmail(body,subject, [email]).then((data) => {
  // Success!
  console.log(data, "success")
    }).catch(() => {
     // Error!
       });
      })
      
    

       //
    })
​
​  this.email=null
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
