import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Environment } from '@ionic-native/google-maps';
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
    email
    homePage
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public route : Router,
    public navigationService : NavigationService,
    public events : Events
  ) {
    this.initializeApp();
    //this.checkBool()
    this.checkUser()
    this.checkPage()
  }
  checkBool(){
    console.log("dddddddddd");
    
    this.events.subscribe('menu:clicked', (boolean)=>{
     this.bollean = boolean
      console.log(boolean);
      console.log("dddd");
    })
    
    
  
  }

  checkPage(){
      this.events.subscribe('currentPage:home', (boolean)=>{
        this.homePage = boolean
      })
  }
  checkUser(){
    this.events.subscribe('user:created', (email)=>{
      console.log(email);
      this.email = email
    })
  }

  auto(url){
    console.log(url);
    this.route.navigate([url])
    this.navigationService.pageNavigator(url)

    
    //this.userService.returnUserProfile()
  }

  signOut(url){
    if(url === 'home'){
      this.events.publish('user:loggedOut', true)
      this.route.navigate([url])
      this.navigationService.pageNavigator(url)
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      Environment.setEnv({
        // api key for server
        'AIzaSyDrcHORRoXIs74hD9fvcfpX3GKbRvJQuKo': 'AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI',
 
        // api key for local development
        'AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI': 'AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI'
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
}
