import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import * as firebase from 'firebase'
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    bollean

    appMenu =[{
      url: 'report',
      title: 'Crime-Alert',
     // icon: ,
    },
    {
      url: 'community-event',
      title: 'Community event',
      
     // icon: ,
    },
   {
    url: 'Logout',
    title: 'LogOut',
   // icon: ,
   }]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public route : Router,
    public navigationService : NavigationService,
    public events : Events
  ) {
    this.initializeApp();
    this.checkBool()
  }
  checkBool(){
    console.log("dddddddddd");
    
    this.events.subscribe('menu:clicked', (boolean)=>{
     this.bollean = boolean
      console.log(boolean);
      console.log("dddd");
    })
    
    
    
  }
  
  auto(url){
    console.log(url);
    this.route.navigate([url])
    this.navigationService.pageNavigator(url)
    //this.userService.returnUserProfile()
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
}
