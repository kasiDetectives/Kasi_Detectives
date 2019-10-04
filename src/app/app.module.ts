import { NgModule, ApplicationModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { PopupPageModule } from './popup/popup.module';
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI",
  authDomain: "kasidetectives.firebaseapp.com",
  databaseURL: "https://kasidetectives.firebaseio.com",
  projectId: "kasidetectives",
  
  storageBucket: "",
  messagingSenderId: "207670776123",
  appId: "1:207670776123:web:b1f7be1f7bb88f7d70271e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, PopupPageModule],
  providers: [
    StatusBar,
    SocialSharing,
    Camera,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
